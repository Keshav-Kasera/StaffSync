# Project Information & Requirements Specification

> **Document Type:** Project Reference & Requirements Document  
> **Course / Program:** Full Stack Development MERN Stack (SkillWallet / SmartBridge)  
> **Domain:** Human Resource Management System (HRMS)  
> **Target Status:** Capstone Project  

---

## 1. Project Overview & Problem Statement

### What is this project?
This application is an enterprise **Human Resource Management (HRM) System**. In plain terms, it is a private web portal that a company uses to manage its workforce online instead of using manual paperwork, spreadsheets, or disjointed emails.

### What problem does it solve?
In many companies, everyday HR tasks are scattered and slow:
* Employees need a simple way to clock in/out, view company news, and request vacation or sick time.
* Managers need a central dashboard to see their team members, monitor daily attendance, and approve or reject leave requests.
* HR Personnel need full oversight over the company's staff directory, organizational announcements, company-wide leave records, and workforce analytics.

This application connects all three groups into a single, secure web application with strict permission boundaries.

---

## 2. Core User Roles & Permissions

The system enforces **Role-Based Access Control (RBAC)**—a security mechanism that checks a user's role before granting access to pages or actions.

```
       +---------------------------------------------+
       |                  HR Admin                   |
       |  (Full Company Oversight, Staff, Analytics) |
       +----------------------+----------------------+
                              |
       +----------------------v----------------------+
       |                   Manager                   |
       |      (Team Attendance, Leave Approvals)     |
       +----------------------+----------------------+
                              |
       +----------------------v----------------------+
       |                  Employee                   |
       |  (Clock-in/out, Apply for Leaves, Profile)  |
       +---------------------------------------------+
```

### Role Breakdown

| Role | Responsibilities & Core Features |
| :--- | :--- |
| **Employee** | 1. Register & securely log in.<br>2. View and update personal profile details.<br>3. Mark daily attendance (clock-in / clock-out) and view attendance logs.<br>4. Submit leave applications (vacation, sick, casual) and monitor approval status.<br>5. View company announcements and notices.<br>6. Browse and access assigned training modules. |
| **Manager** | 1. View and oversee assigned team members.<br>2. Review pending leave requests from direct reports.<br>3. Approve or reject team leave requests with comments.<br>4. Monitor team attendance patterns.<br>5. Track and monitor employee performance.<br>6. Coordinate and assign team training programs. |
| **HR Personnel** | 1. Full employee directory management (Create, Read, Update, Deactivate).<br>2. Manage managers and team assignments.<br>3. Company-wide attendance monitoring and auditing.<br>4. Company-wide leave records management.<br>5. Create, edit, and publish official announcements.<br>6. View organizational reports and workforce analytics. |

---

## 3. Technology Stack & Tools

All technologies specified in the course syllabus use the **MERN Stack**:

* **Frontend (Client-Side)**
  * **React.js**: Industry-standard library for building interactive user interfaces.
  * **Material UI (MUI)**: Professional component library providing ready-to-use, polished UI elements (tables, buttons, dialogs, forms).
  * **Redux Toolkit**: Centralized state management tool (keeps shared data—like current user info—consistent across all screens).
  * **React Router**: Manages client-side navigation between pages without refreshing the browser.
  * **Axios**: HTTP client used to send requests from the React frontend to the backend API.

* **Backend (Server-Side)**
  * **Node.js**: JavaScript runtime environment that executes server code.
  * **Express.js**: Web server framework for handling routes and RESTful API endpoints.
  * **JSON Web Token (JWT)**: Secure, encrypted digital tokens used to authenticate users and maintain login sessions.
  * **bcryptjs**: Cryptographic library used to hash (scramble) user passwords so they are never stored in plain text.
  * **CORS (Cross-Origin Resource Sharing)**: Middleware enabling secure communication between frontend and backend ports.
  * **Dotenv**: Tool for loading private environment variables (passwords, database URLs) from a protected `.env` file.

* **Database (Persistence)**
  * **MongoDB**: NoSQL database that stores data as JSON-like documents.
  * **Mongoose**: Modeling library that defines schemas (strict blueprints), validation rules, and relationships for database collections.

* **Development & Testing Tools**
  * **Visual Studio Code**: Recommended development environment.
  * **Postman**: API testing tool used to verify backend endpoints before connecting the frontend.

---

## 4. Database Collections (Schema Blueprint)

The syllabus explicitly mandates **8 collections** in the database:

1. **`Users`**: Holds login credentials (email, hashed password, role: `employee`, `manager`, or `hr`, account status).
2. **`Employees`**: Holds employee profile details (job title, department, contact info, join date, manager assignment).
3. **`Managers`**: Holds manager profiles, department oversight, and direct report mappings.
4. **`Attendance`**: Records daily clock-in/out timestamps, date, employee ID, and status (`Present`, `Late`, `Half-day`, `Absent`).
5. **`Leaves`**: Stores leave applications (leave type, start date, end date, reason, status: `Pending`, `Approved`, `Rejected`, reviewer comments).
6. **`Announcements`**: Official corporate notices (title, content, priority: `High`, `Medium`, `General`, author, publication date).
7. **`Trainings`**: Training courses or skill modules (title, description, duration, assigned employees, completion status).
8. **`Notifications`**: User alerts for leave approval/rejection updates, new announcements, or policy reminders.

---

## 5. Required Pages & User Interface

The application must include the following dedicated screens:

* **Landing / Public Pages**
  * **Home Page**: Clean introduction to the company portal with login/registration access.
  * **Login / Registration**: Secure forms with validation and error alerts.
* **Role Dashboards**
  * **Employee Dashboard**: Summary cards for attendance streak, pending leave balances, recent announcements, and quick clock-in/out actions.
  * **Manager Dashboard**: Overview of team attendance today, pending leave requests requiring approval, and quick team stats.
  * **HR Dashboard**: High-level organizational KPIs (total headcount, attendance percentage, pending requests, department breakdown).
* **Core Functional Screens**
  * **Employee Profile Page**: Personal information management and account security.
  * **Attendance Management Page**: Clock-in interface with monthly calendar/table view of logs.
  * **Leave Management Page**: Form to apply for leave + real-time status tracker table.
  * **Announcements Page**: Company noticeboard with search, filter, and management modal for HR.
* **Responsive Layout**: Designed to adapt seamlessly across desktop (1366x768 reference), tablet, and mobile displays.

---

## 6. Security, Testing & Optimization Requirements

### Security & Protection
* Passwords must be hashed using `bcryptjs` (never stored in plain text).
* API endpoints must be protected using JWT middleware; requests without a valid token must be rejected with HTTP 401 Unauthorized.
* Role-based authorization middleware must verify user permissions; non-admin users must be blocked from administrative routes (HTTP 403 Forbidden).
* Environment variables (`.env`) must store all secrets, port configs, and database connection strings.

### Optimization Standards
* **Database Indexing**: Add indexes on frequently queried fields (e.g., `userId`, `date`, `status`) to ensure fast queries.
* **Pagination**: Implement page-by-page fetching for large data sets (e.g., attendance records and employee directories) to prevent slow network payloads.
* **Lazy Loading**: Split frontend bundles so screens load only when navigated to, speeding up initial load times.

### Testing Scope
* **Authentication Testing**: Register, login, invalid credentials, expired tokens.
* **Attendance Testing**: Clock-in, duplicate clock-in prevention, clock-out calculations.
* **Leave Flow Testing**: Employee request submission $\rightarrow$ Manager approval/rejection $\rightarrow$ Employee status update.
* **Employee Management Testing**: Admin creation, profile editing, and deletion/deactivation.
* **Dashboard Testing**: Correct metrics displayed per role.

---

## 7. Submission Deliverables

Per course instructions, the project requires two final links:
1. **GitHub Repository**: Clean, well-structured codebase with comprehensive documentation and setup instructions.
2. **Live Deployed Application**: Publicly accessible web demo (frontend and backend running live on a cloud hosting service).
