# Job Board Application

A full-stack job board platform featuring role-based access control, file uploads, email notifications, and a dual-dashboard interface for Employers and Candidates.
<img width="1912" height="893" alt="image" src="https://github.com/user-attachments/assets/1a2f999e-8fc5-4502-ab6c-3c069c31054a" />


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

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user (Employer or Candidate)  
- **POST** `/api/auth/login` - Login and receive a JWT token  
- **GET** `/api/auth/me` - Get current logged-in user details  

### Jobs
- **GET** `/api/jobs` - Get all jobs (supports search, filters, pagination)  
- **GET** `/api/jobs/:id` - Get details of a specific job  
- **POST** `/api/jobs` - Create a new job posting (Employer only)  
- **PUT** `/api/jobs/:id` - Update a job posting (Employer only)  
- **DELETE** `/api/jobs/:id` - Delete a job posting (Employer only)  
- **GET** `/api/jobs/employer/jobs` - Get all jobs posted by the current employer  
- **GET** `/api/jobs/:id/applications` - Get all applications for a specific job (Employer only)  

### Applications
- **POST** `/api/applications` - Apply to a job with a resume (Candidate only)  
- **GET** `/api/applications/my` - Get all applications for the logged-in candidate  
- **GET** `/api/applications/employer` - Get all applications received by the logged-in employer  
- **PUT** `/api/applications/:id/status` - Update application status (e.g., Interview, Offer) (Employer only)  
- **PUT** `/api/applications/:id/withdraw` - Withdraw an application (Candidate only)  


## ⚠️ **Known Limitations & Future Improvements**

While this application meets all core functional requirements, the following limitations exist due to time constraints and the nature of a hackathon/demo environment:

### 1. Email Delivery (Demo Mode)
- The application currently uses Ethereal Email (fake SMTP service) for testing purposes.  
- Emails are not delivered to real inboxes. You must check the server console logs for the "Preview URL" to view sent emails.  
- **Future Fix:** Integrate SendGrid or AWS SES for production email delivery.

### 2. Server Spin-Down (Render Free Tier)
- The backend is hosted on Render's free tier, which spins down after 15 minutes of inactivity.  
- The first request might take 30–50 seconds to load while the server wakes up. Please be patient on the initial login.

### 3. Salary Filtering Strategy
- The salary filter relies on parsing numeric values from the input string (e.g., "$100k+").  

### 4. Real-Time Updates
- If an employer updates a status, the candidate must refresh the page to see the change on their Kanban board.

### 5. Data Persistence
- Withdrawing an application permanently deletes the record from the database rather than marking it as withdrawn.



