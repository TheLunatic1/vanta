# VANTA - E-commerce Website

A modern, fully responsive e-commerce platform built for **Vanta** — supporting **VantaBlack (Men)**, **VantaRozze (Women)**, and **Others** (tech gadgets, accessories, or any product).

The website is designed for **dropshipping** today and easily scalable for **own inventory** in the future.

---

## ✨ Key Features

- **Google Sheet Auto-Sync**: Add/update products by simply editing a Google Sheet — products appear on the website automatically.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop.
- **Multiple Categories**: VantaBlack (Men), VantaRozze (Women), Others.
- **Variant Selection**: Colors, sizes, and other variants are selectable on product detail page.
- **Smart Cart System**: Add multiple products with selected variants.
- **WhatsApp Ordering**: One-click "Add to Cart" + "Send Full Order on WhatsApp" with complete order summary.
- **Fast & SEO Friendly**: Built with Next.js 16 + Tailwind CSS + DaisyUI.
- **Image Support**: Works with Cloudinary URLs (recommended).

---

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Backend**: Separate repo (`vanta-backend`) — Express + MongoDB + Google Sheets API
- **Deployment**: Vercel (Frontend) + Vercel (Backend)
- **Image Hosting**: Cloudinary (Recommended)

---

## 📁 Project Structure

```
vanta/
├── app/
│   ├── products/              # Products listing + filters
│   ├── product/[productID]/   # Product detail with variant selection
│   ├── cart/                  # Cart with WhatsApp summary
│   ├── layout.tsx
│   └── page.tsx               # Home page
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── Footer.tsx
│   └── CartContext.tsx
├── public/
│   └── vanta-logo.png         # Your custom logo
├── .env.local
└── next.config.ts
```

---

## 🚀 How It Works (For Client)

### 1. Adding Products
1. Upload product images to **Cloudinary** → Copy URLs
2. Open **Google Sheet** and add/update rows
3. Products automatically sync to the website (every 2 minutes)

### 2. Customer Journey
- Browse products by category (VantaBlack / VantaRozze / Others)
- Click "View Details"
- Select variant (color/size)
- Add to Cart
- Go to Cart → Click **"Send Full Order on WhatsApp"**
- One clean message with all items + total amount

---

## 🔧 Setup Instructions (For Developers)

### Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_BACKEND_URL=https://Your-backend-URL.vercel.app
```

### My backend Repository

```url
https://github.com/TheLunatic1/vanta-backend.git
```


### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

---

## 📱 Responsive Design

- Mobile-first approach
- Smooth experience on all screen sizes
- Optimized images and fast loading

---

## 🔄 Google Sheet Column Format

Make sure your Google Sheet has these exact columns:

- `ProductID` (unique)
- `Title`
- `Description`
- `Price`
- `SalePrice` (optional)
- `Images` → Cloudinary URLs separated by comma
- `Category` → `Men` / `Women` / `Others`
- `Variants` → `Black-M,Black-L,White-XL` (comma separated)
- `SKU` (optional)

---

## 📞 WhatsApp Integration

All orders are sent via WhatsApp.  
Update the WhatsApp number in these files:
- `app/cart/page.tsx`
- `app/product/[productID]/page.tsx`

---

## 🎯 Future Ready

- Easy to add payment gateway later (Stripe, bKash, etc.)
- Ready for own inventory management
- Easy to add more features (wishlist, reviews, blog, etc.)

---

## 📄 License

Private project for **Vanta** client.

---

**Built by Salman Toha**  
For any technical support or future enhancements, feel free to contact.

---

**Last Updated**: April 2026
=======
# JobPulse AI – Frontend

A stunning full-stack AI-powered job portal with role-based dashboards, real-time messaging, and an intelligent
Grok-3-Mini Career Coach.

![JobPulse AI](/preview.png)

## ✨ Live Demo
[View Live Demo](https://jobpulse-ai-frontend.vercel.app)

## 🚀 Tech Stack
- **Next.js 15** (App Router + React Compiler)
- **TypeScript**
- **Tailwind CSS v4 + DaisyUI**
- **Framer Motion**
- **Lucide React** (Icons)
- **React Toastify** + **Confetti**
- **Axios** for API calls
- **Socket.io**
## 🎯 Key Features

### For Job Seekers
- Apply with cover letter in a smooth modal
- **AI Career Coach** – 24/7 intelligent guidance powered by Grok-3-Mini
- Track all applications with real-time status

### For Employers
- Post new jobs (pending admin approval)
- Manage postings and view received applications
- Simple, elegant dashboard

### For Admin
- Review & approve/reject pending jobs
- Manage all users
- Full platform oversight

### General
- Fully responsive dark-first modern design
- Role-based dashboards with smooth sidebar
- Heavy Framer Motion animations (stagger, spring, hover effects)
- Secure JWT authentication
- Chat system is still in devlopment

## 🛠️ Installation & Setup

```bash
git clone https://github.com/TheLunatic1/jobpulse-ai-frontend.git
cd jobpulse-ai-frontend

npm install
npm run dev
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://jobpulse-ai-backend.onrender.com
```

## 📱 Pages
- `/` – Home with Hero, Featured Jobs, Why Choose Us, Impact Stats, Trusted By, Testimonials
- `/jobs` – All open positions
- `/companies` – Company directory
- `/companies/[id]` – Company profile
- `/ai-coach` – Dedicated AI Coach landing
- `/about` – About the project
- `/dashboard` – Role-based dashboard (Job Seeker / Employer / Admin)
- `/auth/login` & `/auth/register`

## ✨ Highlights for Resume
- Heavy use of Framer Motion for buttery smooth animations.
- Role-based authentication and protected routes.
- Real-time features using Socket.IO (backend).
- Clean, maintainable TypeScript codebase.
- Fully responsive design with Tailwind + DaisyUI.

---

Made by **Salman Toha**
