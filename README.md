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
🧪 **Testing Guide (Postman)**

A complete Postman Collection is included in the root directory: `aniket_postman_collection.json`.

**Import Instructions:**

1. Open Postman → Import → Upload `postman_collection.json`.  
2. The collection uses a variable `{{url}}` which defaults to `http://localhost:5000/api`.  
3. After logging in, copy the token from the response and paste it into the Collection Variables "current value" for `token`.

