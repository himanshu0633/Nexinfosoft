# Nexinfosoft Backend API Reference

This document provides a complete map of the **Nexinfosoft Express.js Backend API Endpoints**. It explains the purpose of each API route, required request payloads, database behavior, and access permissions.

---

## ⚡ Global Configuration & Rules

* **Base URL**: All endpoints are prefixed with `/api`.
* **Authentication**: Endpoints marked as **Protected** require a valid JSON Web Token (JWT) sent in the request header:
  ```http
  Authorization: Bearer <your_jwt_token>
  ```
* **Database Drivers**: MongoDB (Mongoose models) stores application metadata, tech stacks, portfolio projects, section text, and customer leads. SQLite is used for supplementary operations.

---

## 🔑 1. Authentication Router (`/api/auth`)

Handles secure administrator authentication.

| Method | Endpoint | Auth | Description & Request Payload |
| :--- | :--- | :---: | :--- |
| **POST** | `/api/auth/login` | **Public** | Authenticates the admin and generates a token.<br><br>**Body Payload**:<br>`{ "username": "...", "password": "..." }`<br><br>**Response**: Returns an 8-hour JWT and admin user object. |

---

## 📬 2. Contact & Consultation Router (`/api/contact`)

Manages client leads and consultation inquiries from the website.

| Method | Endpoint | Auth | Description & Request Payload |
| :--- | :--- | :---: | :--- |
| **POST** | `/api/contact` | **Public** | Submits a new customer inquiry form.<br><br>**Body Payload**:<br>`{ "fullName": "*", "email": "*", "phone": "*", "service": "*", "budget": "*", "details": "*", "companyName": "" }` *(Note: * indicates required field)* |
| **GET** | `/api/contact` | **Protected** | Retrieves a list of all contact inquiries, sorted latest first. |
| **PUT** | `/api/contact/:id/status` | **Protected** | Updates the lifecycle stage of an enquiry.<br><br>**Body Payload**:<br>`{ "status": "..." }` *(Allowed: `pending`, `in-discussion`, `converted`, `rejected`)* |
| **DELETE**| `/api/contact/:id` | **Protected** | Deletes a contact submission permanently from the database. |

---

## 📑 3. Dynamic Section Content Router (`/api/content`)

Enables live customization of text, buttons, and images on the website homepage and subpages.

| Method | Endpoint | Auth | Description & Request Payload |
| :--- | :--- | :---: | :--- |
| **GET** | `/api/content/:sectionId` | **Public** | Fetches content data for a specific section (e.g. `hero`, `stats`, `services`, `whychooseus`). |
| **PUT** | `/api/content/:sectionId` | **Protected** | Updates content parameters with strict character length limits.<br><br>**Body Payload**:<br>`{ "title": "", "subtitle": "", "description": "", "image_url": "", "metadata": {} }` |

> [!WARNING]
> To protect the frontend layout from breaking, the `PUT /api/content/:sectionId` endpoint enforces strict backend limits: Title max 100 chars, Subtitle max 50 chars, and Description max 400 chars.

---

## 💼 4. Portfolio Projects Router (`/api/projects`)

Manages projects shown on the portfolio page.

| Method | Endpoint | Auth | Description & Request Payload |
| :--- | :--- | :---: | :--- |
| **GET** | `/api/projects` | **Public** | Retrieves all portfolio projects sorted chronologically. |
| **POST** | `/api/projects` | **Protected** | Adds a new project portfolio item.<br><br>**Body Payload**:<br>`{ "name": "*", "category": "*", "tag": "", "techs": [], "desc": "", "icon": "", "image_url": "" }` |
| **PUT** | `/api/projects/:id` | **Protected** | Modifies an existing project entry. |
| **DELETE**| `/api/projects/:id` | **Protected** | Deletes a project from the portfolio system. |

---

## 🛠️ 5. Services Router (`/api/services`)

Controls core studio offerings (e.g., E-commerce, Custom ERP, Branding).

| Method | Endpoint | Auth | Description & Request Payload |
| :--- | :--- | :---: | :--- |
| **GET** | `/api/services` | **Public** | Fetches the complete catalog of services. |
| **POST** | `/api/services` | **Protected** | Adds a new service module.<br><br>**Body Payload**:<br>`{ "slug": "*", "title": "*", "subtitle": "", "icon": "", "intro": "", "benefits": [], "deliverables": [], "image_url": "" }` *(Note: `slug` must be unique)* |
| **PUT** | `/api/services/:id` | **Protected** | Updates service parameters and slug routing definitions. |
| **DELETE**| `/api/services/:id` | **Protected** | Removes a service module. |

---

## 🧬 6. Technology Stack Router (`/api/techstack`)

Manages the list of technologies shown on the `/technology-stack` page.

| Method | Endpoint | Auth | Description & Request Payload |
| :--- | :--- | :---: | :--- |
| **GET** | `/api/techstack` | **Public** | Retrieves all tech stack items categorized (Frontend, Backend, etc.). |
| **POST** | `/api/techstack` | **Protected** | Creates a new tech stack entry.<br><br>**Body Payload**:<br>`{ "category": "*", "name": "*", "icon": "", "desc": "", "color": "", "metadata": {} }` |
| **PUT** | `/api/techstack/:id` | **Protected** | Modifies details of a tech stack item. |
| **DELETE**| `/api/techstack/:id` | **Protected** | Removes a tech stack item from the list. |

---

## 📤 7. File Upload Router (`/api/upload`)

Enables secure image uploading for portfolio cards or content banners.

| Method | Endpoint | Auth | Description & Request Payload |
| :--- | :--- | :---: | :--- |
| **POST** | `/api/upload` | **Protected** | Uploads a single image dynamically to the server.<br><br>**Request Format**: `multipart/form-data`<br>**Key**: `image` *(File attachment)*<br><br>**Response**: `{ "imageUrl": "/uploads/asset-xxxxxxxx.png" }` |

> [!NOTE]
> File uploads are restricted to standard web formats (`jpeg`, `jpg`, `png`, `webp`, `svg`) and have a strict size limit of **5MB** to maintain server health.
