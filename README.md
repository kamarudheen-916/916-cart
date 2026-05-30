# Premium Bamboo Tissue Box - Demand Validation Platform

This is a production-ready e-commerce demand validation landing page built to gauge market interest for the **Premium Bamboo Tissue Box** before investing in physical inventory. 

Instead of traditional cart checkouts and gateway payment routing, the system registers high-intent customer reservations at a promotional price of ₹449, capturing contact demographics, requested quantity, and marketing attribution tags (UTM source, medium, and campaign). 

---

## Technical Architecture

The project is designed as a modular monorepo:

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Radix UI. It tracks page views, button clicks, and modal registrations, with custom responsive SVG analytics charts.
- **Backend**: NestJS framework, Prisma ORM, PostgreSQL database, Class Validator schema checks, and Nodemailer notification integrations.

---

## Installation & Setup

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.x or v20.x+)
- **npm** (v9.x or v10.x+)
- **PostgreSQL** Database server

---

### Folder Structures

```
916-cart/
├── README.md
├── frontend/             # Next.js App
│   ├── package.json
│   ├── src/
│   │   ├── app/          # Pages (Landing, Admin Dashboard)
│   │   ├── components/   # UI elements, modals
│   │   └── utils/        # UTM & session tracking
└── backend/              # NestJS Server
    ├── package.json
    ├── prisma/           # Prisma Schemas & Migrations
    └── src/              # Logic modules (Leads, Analytics, Mailer)
```

---

### 1. Database & Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create and configure your environment file (`.env`):
   Configure the database URL, SMTP transporter credentials, and admin security password.
   ```env
   # Database connection string
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bamboo_validation?schema=public"

   # NestJS Server Configuration
   PORT=5000

   # Admin dashboard password
   ADMIN_PASSWORD="PremiumBambooAdminSecret2026"

   # SMTP configuration (Nodemailer)
   SMTP_HOST="smtp.mailtrap.io"
   SMTP_PORT=2525
   SMTP_USER="your_smtp_username"
   SMTP_PASS="your_smtp_password"
   SMTP_FROM="no-reply@bambootissuebox.com"

   # Admin recipient address
   ADMIN_EMAIL="admin@bambootissuebox.com"
   ```

4. Run Prisma database migrations to create the Lead and AnalyticsEvent tables:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the backend development server:
   ```bash
   npm run start:dev
   ```
   The backend API will boot and listen at: `http://localhost:5000/api`

---

### 2. Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The landing page will render at: `http://localhost:3000`
   The admin console is accessible at: `http://localhost:3000/admin`

---

## Core Systems

### UTM & Analytics Tracking

The system captures UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) dynamically upon load and stores them in `sessionStorage` to persist across sections.
A unique `sessionId` is assigned per visitor visit, enabling the server to log:
1. `page_visit`: Stored on mount.
2. `button_click`: Logged when call-to-actions are engaged.
3. `modal_open`: Logged when the reservation modal loads.
4. `lead_submission`: Logged when a user successfully reserves quantity.

### Email Notification System

When a reservation is submitted:
1. **Admin Alert**: An email is dispatched using Nodemailer to `ADMIN_EMAIL` detailing the client's name, phone number, email, state, city, and quantity.
2. **Customer Confirmation**: A styled confirmation letter is emailed to the client, confirming reservation details, price locking (₹449), and explaining that no payment is required until stock is ready.

### Admin Demand Dashboard

Accessible securely under `/admin` by authenticating with `ADMIN_PASSWORD`. It loads:
- **Core Conversion Metrics**: Conversion Rates, Visitor aggregates, Lead counts, and total requested boxes.
- **Visual Trends**: SVG charts mapping Top Traffic Channels and geographic demand (States).
- **Recent Registrants**: An interactive spreadsheet listing the 20 latest bookings.

---

## Future Roadmap

Once market demand is validated, the landing page can scale using the following roadmap:

1. **Inventory Management**: Build real-time warehouse inventory integrations (e.g. ERP/Shopify API) with automated waitlists.
2. **Razorpay Integration**: Introduce payment collections using Razorpay checkout scripts to collect instant secure payments.
3. **Order Processing**: Create shipment dashboard models to package, track, and dispatch orders.
4. **Shipping Integration**: Connect automated shipping tools (e.g., Shiprocket, Delhivery) to print labels and sync tracking links.
5. **Customer Accounts**: Implement authentication so customers can track orders, edit addresses, and manage repeat bookings.
6. **Product Reviews**: Add ratings, image attachments, and customer reviews to boost trust and conversion.
