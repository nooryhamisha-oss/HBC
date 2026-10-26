import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  }),
);

app.use(express.json({ limit: "1mb" }));

// محدود کردن تعداد درخواست‌ها برای جلوگیری از استفاده بیش از حد
app.use(
  "/api/chat",
  rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: "تعداد درخواست‌ها زیاد است. لطفاً یک دقیقه بعد دوباره تلاش کنید.",
    },
  }),
);

// بررسی وضعیت سرور
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "HBC AI API",
  });
});

// اتصال به xAI / Grok
const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

// دریافت پیام و ارسال آن به Grok
app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.XAI_API_KEY) {
      return res.status(500).json({
        error: "کلید XAI_API_KEY در فایل .env تنظیم نشده است.",
      });
    }

    const { messages } = req.body ?? {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "لطفاً یک پیام معتبر ارسال کنید.",
      });
    }

    // فقط نقش‌ها و متن‌های معتبر را قبول می‌کنیم.
    const validMessages = messages.filter(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    );

    if (validMessages.length === 0) {
      return res.status(400).json({
        error: "پیام قابل استفاده‌ای دریافت نشد.",
      });
    }

    // آخرین پیام باید از طرف کاربر باشد.
    if (validMessages[validMessages.length - 1].role !== "user") {
      return res.status(400).json({
        error: "آخرین پیام باید پیام کاربر باشد.",
      });
    }

    const completion = await grok.chat.completions.create({
      model: process.env.XAI_MODEL || "grok-3",
      messages: [
        {
          role: "system",
          content: `
You are the HBC Digital Skills Training Assistant.

Help users learn and work with:
- Web Development & Coding
- Digital Marketing & Content
- E-Commerce & Freelancing
- Data Analytics & Bookkeeping
- AI Tools & Digital Services

Give clear, practical, beginner-friendly answers.
Respond in the same language as the user when possible.
Clearly label example or demo data.
Never invent official HBC statistics, participant records, attendance figures,
program outcomes, or other unverified information.
If information is unavailable, explain that it needs to be verified.
          `.trim(),
        },
        ...validMessages.map(({ role, content }) => ({
          role,
          content,
        })),
      ],
    });

    const reply = completion.choices[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      return res.status(502).json({
        error: "پاسخی از Grok دریافت نشد. لطفاً دوباره تلاش کنید.",
      });
    }

    // نام reply با فرانت‌اند هماهنگ شده است.
    return res.json({ reply });
  } catch (error) {
    console.error("Grok API error:", error.message);

    const status =
      error.status === 401 || error.status === 403
        ? error.status
        : error.status === 429
          ? 429
          : 502;

    let message = "ارتباط با Grok ناموفق بود. تنظیمات سرور را بررسی کنید.";

    if (error.status === 401 || error.status === 403) {
      message =
        "احراز هویت xAI ناموفق بود. کلید API و دسترسی حساب خود را بررسی کنید.";
    } else if (error.status === 429) {
      message =
        "محدودیت درخواست یا اعتبار API اعمال شده است. وضعیت حساب xAI را بررسی کنید.";
    } else if (error.status === 404) {
      message = "مدل انتخاب‌شده پیدا نشد. مقدار XAI_MODEL را بررسی کنید.";
    }

    return res.status(status).json({
      error: message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`HBC AI API running at http://localhost:${PORT}`);
});
