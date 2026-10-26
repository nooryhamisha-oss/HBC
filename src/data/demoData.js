export const tracks = [
  "Web Development & Coding",
  "Digital Marketing & Content",
  "E-Commerce & Freelancing",
  "Data Analytics & Bookkeeping",
  "AI Tools & Digital Services",
];
export const shortTracks = ["Web Development", "Digital Marketing", "E-Commerce", "Data Analytics", "AI Tools"];
export const participants = [
 ["ST-001","Amina","Ahmadi","Kabul",0,"Cohort A","Active"],
 ["ST-002","Farid","Rahimi","Balkh",1,"Cohort A","Active"],
 ["ST-003","Laila","Mohammadi","Herat",2,"Cohort A","Active"],
 ["ST-004","Omid","Karimi","Kabul",3,"Cohort B","Active"],
 ["ST-005","Zahra","Noori","Nangarhar",4,"Cohort B","Active"],
 ["ST-006","Samiullah","Azizi","Balkh",0,"Cohort A","Active"],
 ["ST-007","Marwa","Safi","Herat",1,"Cohort B","Active"],
 ["ST-008","Jawad","Hashimi","Kunduz",2,"Cohort A","Active"],
 ["ST-009","Nadia","Yousufi","Kabul",3,"Cohort B","Active"],
 ["ST-010","Bilal","Nawabi","Bamyan",4,"Cohort B","Active"],
 ["ST-011","Shabnam","Etemadi","Balkh",0,"Cohort B","Active"],
 ["ST-012","Wahid","Sultani","Herat",1,"Cohort A","Active"],
 ["ST-013","Roya","Ferozi","Kabul",2,"Cohort B","Active"],
 ["ST-014","Nasir","Qasimi","Nangarhar",3,"Cohort A","Active"],
 ["ST-015","Mina","Amini","Balkh",4,"Cohort A","Active"],
 ["ST-016","Haroon","Safdar","Kunduz",0,"Cohort B","Active"],
 ["ST-017","Sahar","Habibi","Herat",1,"Cohort A","Active"],
 ["ST-018","Ehsan","Wafa","Kabul",2,"Cohort A","Active"],
 ["ST-019","Lema","Niazi","Bamyan",3,"Cohort B","Active"],
 ["ST-020","Tamim","Barakzai","Balkh",4,"Cohort B","Active"],
 ["ST-021","Freshta","Raufi","Kabul",0,"Cohort A","Active"],
 ["ST-022","Khalid","Andar","Herat",1,"Cohort B","Active"],
 ["ST-023","Parwana","Samim","Nangarhar",2,"Cohort A","Active"],
 ["ST-024","Zubair","Arian","Kunduz",3,"Cohort B","Active"],
 ["ST-025","Mursal","Latif","Balkh",4,"Cohort A","Active"],
];
export const students = participants.map((s,i)=>({id:s[0],first:s[1],last:s[2],province:s[3],track:tracks[s[4]],cohort:s[5],status:s[6],phone:`0700 000 ${String(100+i).slice(-3)}`,tazkira:`DEMO-${String(10001+i)}`,enrolled:`2026-${String((i%8)+1).padStart(2,"0")}-${String((i%25)+1).padStart(2,"0")}`}));
export const instructors = [
 {id:"IN-01",name:"Nadia Rahimi",track:tracks[0],education:"BSc, Computer Science",experience:6,sessions:24,cohort:"Cohort A"},
 {id:"IN-02",name:"Ahmad Wali",track:tracks[1],education:"BA, Journalism & Media",experience:5,sessions:22,cohort:"Cohort A"},
 {id:"IN-03",name:"Maryam Sediqi",track:tracks[2],education:"BBA, Marketing",experience:7,sessions:21,cohort:"Cohort A"},
 {id:"IN-04",name:"Faisal Noori",track:tracks[3],education:"BSc, Economics",experience:8,sessions:25,cohort:"Cohort B"},
 {id:"IN-05",name:"Laila Hamidi",track:tracks[4],education:"BSc, Information Systems",experience:4,sessions:19,cohort:"Cohort B"},
 {id:"IN-06",name:"Omid Farzan",track:tracks[0],education:"Diploma, Software Development",experience:3,sessions:17,cohort:"Cohort B"},
 {id:"IN-07",name:"Sahar Ebrahimi",track:tracks[1],education:"BA, Communications",experience:6,sessions:20,cohort:"Cohort B"},
 {id:"IN-08",name:"Wahid Azimi",track:tracks[2],education:"BBA, Business Administration",experience:5,sessions:18,cohort:"Cohort A"},
 {id:"IN-09",name:"Roya Akbari",track:tracks[3],education:"BSc, Finance",experience:9,sessions:23,cohort:"Cohort A"},
 {id:"IN-10",name:"Farid Hashimi",track:tracks[4],education:"BSc, Computer Science",experience:4,sessions:16,cohort:"Cohort B"},
];
export const graduates = students.slice(0,15).map((s,i)=>({...s,graduated:`2026-${String((i%6)+3).padStart(2,"0")}-15`,project:["Community website","Digital campaign","Online shop","Budget tracker","AI study assistant"][i%5],result:["Completed","Completed","Completed"][i%3]}));
export const projects = [
 {id:"PR-101",title:"Community Learning Website",track:tracks[0],student:"Amina Ahmadi",cohort:"Cohort A",status:"Reviewed",date:"2026-09-18",instructor:"Nadia Rahimi"},
 {id:"PR-102",title:"Local Business Content Plan",track:tracks[1],student:"Farid Rahimi",cohort:"Cohort A",status:"Submitted",date:"2026-09-20",instructor:"Ahmad Wali"},
 {id:"PR-103",title:"Handmade Products Store",track:tracks[2],student:"Laila Mohammadi",cohort:"Cohort A",status:"In progress",date:"2026-09-22",instructor:"Maryam Sediqi"},
 {id:"PR-104",title:"Small Business Budget Book",track:tracks[3],student:"Omid Karimi",cohort:"Cohort B",status:"Reviewed",date:"2026-09-25",instructor:"Faisal Noori"},
 {id:"PR-105",title:"AI Study Planner Prototype",track:tracks[4],student:"Zahra Noori",cohort:"Cohort B",status:"Submitted",date:"2026-09-28",instructor:"Laila Hamidi"},
 {id:"PR-106",title:"Portfolio Website",track:tracks[0],student:"Samiullah Azizi",cohort:"Cohort A",status:"In progress",date:"2026-10-02",instructor:"Omid Farzan"},
 {id:"PR-107",title:"Social Media Campaign",track:tracks[1],student:"Marwa Safi",cohort:"Cohort B",status:"Reviewed",date:"2026-10-04",instructor:"Sahar Ebrahimi"},
 {id:"PR-108",title:"Freelance Service Catalogue",track:tracks[2],student:"Jawad Hashimi",cohort:"Cohort A",status:"Submitted",date:"2026-10-06",instructor:"Wahid Azimi"},
 {id:"PR-109",title:"Sales Analysis Dashboard",track:tracks[3],student:"Nadia Yousufi",cohort:"Cohort B",status:"In progress",date:"2026-10-08",instructor:"Roya Akbari"},
 {id:"PR-110",title:"FAQ Assistant Demo",track:tracks[4],student:"Bilal Nawabi",cohort:"Cohort B",status:"Reviewed",date:"2026-10-10",instructor:"Farid Hashimi"},
 {id:"PR-111",title:"Responsive Event Website",track:tracks[0],student:"Shabnam Etemadi",cohort:"Cohort B",status:"Submitted",date:"2026-10-12",instructor:"Nadia Rahimi"},
 {id:"PR-112",title:"Email Marketing Plan",track:tracks[1],student:"Wahid Sultani",cohort:"Cohort A",status:"In progress",date:"2026-10-14",instructor:"Ahmad Wali"},
];
export const internships = students.slice(0,10).map((s,i)=>({id:`IP-${201+i}`,student:`${s.first} ${s.last}`,track:tracks[i%5],host:["Digital Skills Lab","Bright Path Studio","North Star Trading","Community Finance Hub","Future Services Lab"][i%5],role:["Junior Web Assistant","Content Intern","E-commerce Assistant","Data Support Intern","AI Services Trainee"][i%5],province:s.province,referred:`2026-09-${String(10+i).padStart(2,"0")}`,status:["Referred","Placed","In progress","Completed","Referred"][i%5],supervisor:instructors[i].name}));
export const attendance = students.slice(0,20).map((s,i)=>({id:`AT-${301+i}`,date:`2026-10-${String((i%15)+1).padStart(2,"0")}`,student:`${s.first} ${s.last}`,track:tracks[i%5],cohort:s.cohort,status:["Present","Present","Present","Late","Absent"][i%5]}));
export const expenses = Array.from({length:15},(_,i)=>({id:`EX-${401+i}`,date:`2026-10-${String((i%15)+1).padStart(2,"0")}`,track:tracks[i%5],category:i%3===0?"Transport":i%3===1?"Internet / data":"Learning materials",amount:[350,180,250,400,200][i%5],status:i%4===0?"Pending":"Approved"}));
export const dailyReports = Array.from({length:8},(_,i)=>({id:`DR-${501+i}`,date:`2026-10-${String(i+1).padStart(2,"0")}`,track:tracks[i%5],instructor:instructors[i].name,present:18-(i%4),absent:2+(i%3),topic:["HTML and CSS","Content planning","Online storefronts","Spreadsheet formulas","AI productivity tools"][i%5],next:"Practical exercise and review"}));
export const holidays = [
 {id:"LV-01",date:"2026-10-26",title:"Scheduled programme break",scope:"All tracks",status:"Planned"},
 {id:"LV-02",date:"2026-11-04",title:"Instructor planning day",scope:"Cohort B",status:"Planned"},
];
export const resources = [
 {id:"RS-01",title:"HTML & CSS learning guide",track:tracks[0],type:"Guide",language:"English",status:"Available",source:"MDN Web Docs"},
 {id:"RS-02",title:"Digital content planning worksheet",track:tracks[1],type:"Worksheet",language:"English",status:"Available",source:"HBC learning materials"},
 {id:"RS-03",title:"E-commerce setup checklist",track:tracks[2],type:"Checklist",language:"English",status:"Available",source:"HBC learning materials"},
 {id:"RS-04",title:"Bookkeeping fundamentals",track:tracks[3],type:"Guide",language:"English",status:"Available",source:"HBC learning materials"},
 {id:"RS-05",title:"AI tools and responsible use",track:tracks[4],type:"Guide",language:"English",status:"Available",source:"UNESCO resources"},
];
