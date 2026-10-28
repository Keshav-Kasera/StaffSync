# StaffSync — Modern Human Resource Management Solution

[![MERN Stack](https://img.shields.io/badge/Stack-MERN%20(Mongo%20%7C%20Express%20%7C%20React%20%7C%20Node)-4f46e5.svg)](https://reactjs.org/)
[![UI](https://img.shields.io/badge/UI-Material%20UI%20(MUI%20v6)-06b6d4.svg)](https://mui.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-10b981.svg)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**StaffSync** is an enterprise-grade Human Resource Management System (HRMS) built on the MERN stack. It centralizes and digitizes core organizational workflows across three distinct permission tiers: **Employees**, **Department Managers**, and **HR Personnel**.

---

## Key Features by User Persona

### 1. HR Personnel (Administrative Control)
* **Staff Directory Management**: Add, view, filter, and deactivate employee accounts across departments.
* **Workforce Analytics**: Live metrics on attendance rates, total headcount, manager count, and department distributions.
* **Leave Oversight**: Full visibility into organizational leave applications with historical decision logging.
* **Corporate Announcements**: Broadcast company-wide notices with category tags, urgency badges, and auto-generated user notifications.
* **Attendance Auditing**: Organization-wide attendance log with status filtering (`Present`, `Late`, `Half-day`).

### 2. Department Managers (Team Oversight)
* **Team Supervision**: Real-time visibility into direct reports and team size.
* **Leave Decision Workflow**: Review, approve, or reject team leave applications with custom feedback comments.
* **Team Attendance**: Monitor daily check-in and checkout times for all department members.
* **Performance Reviews**: Record 1-5 star performance ratings and constructive feedback for team members.
* **Training Coordination**: Create and assign upskilling programs to team members.

### 3. Employees (Self-Service Portal)
* **One-Click Attendance**: Daily clock-in and clock-out with automatic hour calculation and late detection.
* **Leave Management**: Apply for Casual, Sick, or Earned leaves with live balance tracking and real-time approval status.
* **Training & Upskilling**: View assigned courses, track progress percentages, and mark certifications as complete.
* **Company Noticeboard**: Stay up to date with pinned corporate announcements and alerts.
* **Personal Profile**: Update contact details, emergency information, and professional skill tags.

---

## Technology Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Material UI (MUI v9), React Router v7, Axios, Emotion, Vite 8 |
| **Backend** | Node.js (v24), Express.js, CORS, Morgan |
| **Database** | MongoDB Atlas (Cloud Clustered NoSQL), Mongoose ODM |
| **Security** | JSON Web Tokens (JWT), bcryptjs password hashing, Role-Based Access Control (RBAC) middleware |
| **UI / UX Polish** | Global Toast/Snackbar notifications, Command Menu (Ctrl+K), Skeletons, Custom SVG Favicon, Page-enter transitions |
| **Optimization** | Route code-splitting (React Lazy/Suspense), Database indexing, Server-side pagination |

---

## Database Architecture (8 Strict Schemas)

StaffSync strictly implements the 8 collections mandated by enterprise HR specifications:
1. **`Users`**: Authentication credentials, hashed passwords, roles (`employee`, `manager`, `hr`), and account status.
2. **`Employees`**: Profile details, employee IDs, department, designation, and leave balances.
3. **`Managers`**: Management profiles, department oversight, and team member mapping.
4. **`Attendance`**: Daily clock-in/out records, total hours, status (`Present`, `Late`, `Half-day`), and compound indexing.
5. **`Leaves`**: Leave applications, date ranges, total days, approval state (`Pending`, `Approved`, `Rejected`), and reviewer notes.
6. **`Announcements`**: Official bulletins, priorities (`Urgent`, `High`, `Medium`), categories, and author references.
7. **`Trainings`**: Professional development modules, durations, and employee completion progress.
8. **`Notifications`**: Real-time alert logs for leave status updates, new assignments, and broadcasts.

---

## Quick Start Guide (Local Setup)

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* [Git](https://git-scm.com/)
* A free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone the Repository
```bash
git clone https://github.com/Keshav-Kasera/StaffSync.git
cd StaffSync
```

### 2. Backend Configuration
Create a `.env` file in the `server/` directory (see `server/.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 4. Seed Sample Database Records
Populate your database with sample accounts and initial records across all 8 collections:
```bash
cd ../server
node src/utils/seedData.js
```

### 5. Run the Application
**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

---

## Evaluation Demo Accounts
 
For quick assessment and testing, the following pre-configured operational accounts are seeded:

| Role | Email Address | Password | Permissions Scope |
| :--- | :--- | :--- | :--- |
| **HR Director** | `hr@staffsync.com` | `Password123!` | System-wide administrative control, employee directory, full leave approvals, broadcasts |
| **Department Manager** | `manager@staffsync.com` | `Password123!` | Team roster oversight, team attendance tracking, leave approval workflow, trainings |
| **Employee (Alex)** | `employee@staffsync.com` | `Password123!` | Self-service clock in/out, leave applications, training tracking, noticeboard |
| **Employee (Sarah)** | `sarah.chen@staffsync.com` | `Password123!` | Direct report to Engineering Manager, secondary test employee |

*(A **Quick 1-Click Demo Logins** panel is integrated directly into the `/login` portal and the `Ctrl+K` Command Palette for instantaneous evaluator testing).*

---

## Security Architecture & Best Practices

* **Cryptographic Token Verification**: All private REST endpoints verify JWT Bearer tokens before request handling.
* **Granular Role-Based Access Control**: Strict role checking middleware returns HTTP 403 Forbidden for unauthorized access attempts.
* **Salted Password Hashing**: Passwords undergo 10-round salted bcrypt hashing before storage.
* **Strict Secret Isolation**: No database strings or private tokens are hardcoded; all configuration is driven by isolated environment variables.

---

## License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
