# Job Board Application

A full-stack job board platform featuring role-based access control, file uploads, email notifications, and a dual-dashboard interface for Employers and Candidates.
 --

  <img src="https://github.com/user-attachments/assets/55e06395-69bb-4161-9d2e-38badf81c165"/>
  Landing Page

 <img src="https://github.com/user-attachments/assets/0a782908-5ef5-47a9-a0f5-ad8fdfe6fb96"/>
 Login Page
 
 <img width="1906" height="886" alt="Pasted image (12)" src="https://github.com/user-attachments/assets/e334ed81-cfcb-4eda-a859-eace9236e7b8" />
 Browse All Jobs
 <img width="1906" height="886" alt="image" src="https://github.com/user-attachments/assets/544c92bc-8300-4c45-bc7a-f3be13bab49a" />

 Candidate Application Page
 <img width="1906" height="886" alt="Pasted image (15)" src="https://github.com/user-attachments/assets/ce1d3dc6-3b64-47a0-9548-b3c629015a06" />
 Employer Dashboard
<img width="1906" height="886" alt="Pasted image (16)" src="https://github.com/user-attachments/assets/94e4aee8-2321-4a31-9cc4-ef511f956e02" />
Jobs Posted by Employer



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

## ⚙️ **Setup Instructions**

### 1. Prerequisites

- Node.js (v18+)  
- MongoDB Connection String  
- Cloudinary Account  

### 2. Installation

**Backend:**

```bash
cd server
npm install
# Create .env file (see below)
npm run dev
```
**Frontend:**

```bash
# from the root
npm install
npm run dev
```
### 3. Environment Variables (.env)

Create a `.env` file in the `server` folder:

```bash
PORT=5000
MONGO_URI=mongodb-atlas-url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret
SMTP_EMAIL=audrey29@ethereal.email
SMTP_PASSWORD=password
```
Note: When running frontend locally use 
```bash 
baseURL: 'http://localhost:5000/api',
```
in src/lib/axios.tsx file.

## 🧪 **Testing Guide (Postman)**

A complete Postman Collection is included in the root directory: `aniket_postman_collection.json`.

**Import Instructions:**

1. Open Postman → Import → Upload `postman_collection.json`.  
2. The collection uses a variable `{{url}}` which defaults to `http://localhost:5000/api`.  
3. After logging in, copy the token from the response and paste it into the Collection Variables "current value" for `token`.

## Test Credentials
Note: You can either use these to test or you can Register and Login your own Candidate and Employer.
```bash
| Role       | Email                 | Password    |
|------------|-----------------------|-------------|
| Employer   | emp-1@test.com        | 123         |
| Candidate  | john@test.com         | 987         |

```
## 📂 Project Architecture

```bash
├──/                    # React Frontend (root)
│   ├── src/components/  # Reusable UI components           
│   ├── src/context/      # Auth State Management
│   ├── src/lib/        # axios, utils
│   └── src/pages/    # Dashboard, Jobs, Login pages
├── server/             # Node.js Backend
│   ├── src/models/     # Mongoose Schemas (User, Job, Application)
│   ├── src/controllers/# Business Logic
│   ├── src/routes/     # API Endpoints
│   └── src/middleware/ # Auth & Upload Middleware
│   └── src/utils/      # email service
├── aniket_postman_collection.json  # postman collection
└── README.md
```
