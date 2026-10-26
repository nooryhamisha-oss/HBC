import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LearningTracks from "./pages/LearningTracks.jsx";
import Instructors from "./pages/Instructors.jsx";
import Logout from "./pages/Logout.jsx";
import ManagementPage from "./pages/ManagementPage.jsx";
import Participants from "./pages/Participants.jsx";
import Graduates from "./pages/Graduates.jsx";
import Projects from "./pages/Projects.jsx";
import Internships from "./pages/Internships.jsx";
import Settings from "./pages/Settings.jsx";
import AIAssistant from "./pages/AIAssistant.jsx";
export default function App(){return <BrowserRouter><Routes>
<Route path="/" element={<LandingPage/>}/><Route path="/login" element={<Login/>}/><Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/students" element={<Participants/>}/><Route path="/find-program" element={<LearningTracks/>}/><Route path="/find-instructor" element={<Instructors/>}/>
<Route path="/graduates" element={<Graduates/>}/><Route path="/projects" element={<Projects/>}/><Route path="/internships" element={<Internships/>}/>
<Route path="/reports" element={<ManagementPage/>}/><Route path="/ai-assistant" element={<AIAssistant/>}/><Route path="/settings" element={<Settings/>}/><Route path="/logout" element={<Logout/>}/>
<Route path="*" element={<Navigate to="/dashboard" replace/>}/></Routes></BrowserRouter>}
