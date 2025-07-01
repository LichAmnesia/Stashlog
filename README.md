# Stashlog

A premium content platform built with Next.js and Firebase, designed for course creators and paid community builders to monetize their knowledge through exclusive, members-only content.

## 🎯 Perfect For

- **Course Creators** - Share premium courses with paying students
- **Community Builders** - Run exclusive paid communities with gated content
- **Coaches & Consultants** - Deliver private content to your clients
- **Content Creators** - Monetize your expertise through subscription content

## Features

- 🔐 **Members-Only Access**: Secure authentication ensures only paying members can access your content
- 👥 **Member Management**: Control who has access to your premium content through whitelist authorization
- 📝 **Rich Content Creation**: Write engaging content with MDX (Markdown + React components)
- 💰 **Content Monetization Ready**: Perfect for paid courses, exclusive tutorials, and premium resources
- 🎨 **Professional Design**: Clean, modern interface that reflects the value of your content
- ⚡ **Lightning Fast**: Built with Next.js 15 and Turbopack for optimal performance
- 🔥 **Enterprise-Grade Security**: Firebase Authentication and Firestore database keep your content safe
- 📱 **Mobile Responsive**: Your members can learn on any device

## Use Cases

### 📚 Online Course Platform
Create a private space for your course students with:
- Lesson content organized by modules
- Exclusive resources and downloads
- Member-only discussions

### 👥 Paid Community Hub
Build a thriving paid community with:
- Exclusive articles and insights
- Premium content library
- Member-only resources

### 🎓 Coaching & Consulting Portal
Deliver value to your clients through:
- Private coaching materials
- Personalized content paths
- Client-only resources

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Content**: MDX (Markdown + JSX)
- **Deployment**: Firebase App Hosting

## Prerequisites

- Node.js 18+ installed
- A Firebase project with Authentication and Firestore enabled
- npm or yarn package manager

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LichAmnesia/Stashlog.git
cd Stashlog/app-hosting
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your Firebase configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase project values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Set up Firebase

1. Enable Authentication in your Firebase project
   - Enable Email/Password and Google sign-in providers
2. Create a Firestore database
3. Add authorized users to the `authorized_users` collection:
   ```
   Collection: authorized_users
   Document ID: user@example.com
   Fields: { email: "user@example.com" }
   ```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## Creating Premium Content

Create MDX files in the `posts/` directory:

```mdx
---
title: "Module 1: Introduction to Advanced Concepts"
date: "2025-01-01"
---

Welcome to this exclusive module! In this lesson, we'll cover...
```

## Content Organization Tips

- **For Courses**: Organize posts by module numbers (e.g., `module-1-intro.mdx`)
- **For Communities**: Use categories or topics (e.g., `advanced-seo-tactics.mdx`)
- **For Coaching**: Create client-specific paths (e.g., `week-1-goals.mdx`)

## Project Structure

```
Stashlog/
├── app-hosting/          # Next.js application
│   ├── src/
│   │   ├── app/         # App Router pages
│   │   ├── components/  # React components
│   │   └── lib/         # Utility functions
│   ├── posts/           # Your premium content (MDX files)
│   └── public/          # Static assets
├── firebase.json        # Firebase configuration
└── firestore.indexes.json
```

## Deployment

### Deploy to Firebase App Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

## Monetization Strategy

Stashlog provides the technical foundation for your content business. Combine it with:
- **Payment Processing**: Stripe, PayPal, or other payment gateways
- **Email Marketing**: Automated onboarding for new members
- **Analytics**: Track member engagement and content performance

## Security & Privacy

- All content requires authentication - no public access
- Member authorization through Firestore whitelist
- Secure Firebase Authentication protects your valuable content
- Environment variables keep sensitive configuration secure

## Why Stashlog?

Unlike generic blogging platforms, Stashlog is specifically designed for the knowledge economy:
- **Built for Monetization**: Every feature supports your content business
- **Member-First Experience**: Smooth, professional experience for paying members
- **Scalable Architecture**: Grows with your audience from 10 to 10,000+ members
- **Full Control**: Self-hosted solution gives you complete ownership

## Contributing

As this is designed for individual content creators and their teams, contributions are typically limited to authorized team members. Please contact the administrator for access.

## License

This project is private and proprietary. All rights reserved.

## Support

For technical support or to request access, please contact the administrator.

---

**Built for the Knowledge Economy** - Turn your expertise into a thriving content business with Stashlog.