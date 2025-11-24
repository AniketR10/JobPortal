# Job Board Application

A full-stack job board platform featuring role-based access control, file uploads, email notifications, and a dual-dashboard interface for Employers and Candidates.

## 🚀 **Features**

- **Authentication:** JWT-based auth with Role-Based Access Control (Employer/Candidate).  
- **Job Management:** Create, update, delete, and search jobs (Full-text search & filters).  
- **Application Tracking:**  
  - **Candidates:** Apply via PDF resume (stored on Cloudinary) and track status on a Kanban board.  
  - **Employers:** View applicants, download secure resumes, and update status (Screening → Offer).  
- **Notifications:** Automated emails via Nodemailer when applications are received or status changes.  
- **Security:** Password hashing, CORS, and protected API routes.  

## 🛠️ **Tech Stack**

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Frontend:** React, Vite, TailwindCSS, Shadcn/UI  
- **Storage:** Cloudinary (Resumes)  
- **Deploy:** Vercel (Frontend) and Render (Backend)

