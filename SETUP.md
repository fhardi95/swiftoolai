# SwiftoolAI — Auth & Dashboard Setup Guide

## Overview
This update adds Google OAuth sign-in, a user dashboard, and tool access protection.
Users must sign in with Google before using any tool.

---

## 1. Install dependencies

```bash
npm install next-auth
```

That's the only new package needed.

---

## 2. Set up Google OAuth credentials

1. Go to https://console.cloud.google.com
2. Create a new project (name it "SwiftoolAI" or similar)
3. Go to **APIs & Services → OAuth consent screen**
   - User type: External
   - App name: SwiftoolAI
   - Add your domain: swiftoolai.com
   - Add scopes: email, profile
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorised JavaScript origins:
     - `http://localhost:3000`
     - `https://www.swiftoolai.com`
   - Authorised redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://www.swiftoolai.com/api/auth/callback/google`
5. Copy the **Client ID** and **Client Secret**

---

## 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

Fill in your .env.local:
```
NEXTAUTH_SECRET=<generated_secret>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<from_google_console>
GOOGLE_CLIENT_SECRET=<from_google_console>
ANTHROPIC_API_KEY=<your_existing_key>
OPENAI_API_KEY=<your_openai_key>
```

---

## 4. Add environment variables to Vercel

In your Vercel dashboard → Project Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| NEXTAUTH_SECRET | (generated secret) |
| NEXTAUTH_URL | https://www.swiftoolai.com |
| GOOGLE_CLIENT_ID | (from Google Console) |
| GOOGLE_CLIENT_SECRET | (from Google Console) |
| ANTHROPIC_API_KEY | (existing key — Claude Sonnet 4.6 page only) |
| OPENAI_API_KEY | (new — used by every other AI tool) |

---

## 5. Drop in the files

Copy files to your project in this structure:

```
app/
├── layout.tsx                          ← REPLACE (adds AuthProvider)
├── _components/
│   ├── AuthProvider.tsx                ← NEW
│   ├── Navbar.tsx                      ← REPLACE (adds sign-in/out)
│   └── ToolLayout.tsx                  ← REPLACE (adds auth gate)
├── auth/
│   └── signin/
│       └── page.tsx                    ← NEW
├── dashboard/
│   └── page.tsx                        ← NEW
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.ts                ← NEW

lib/
└── auth.ts                             ← NEW

middleware.ts                           ← NEW (at project root, same level as app/)
.env.local.example                      ← NEW (copy to .env.local and fill in)
```

---

## 6. How it works

**Sign-in flow:**
1. User visits any `/tools/*` page
2. Middleware detects no session → redirects to `/auth/signin`
3. User clicks "Continue with Google"
4. Google OAuth → NextAuth creates a JWT session
5. User is redirected back to the tool they wanted

**Dashboard:**
- Lives at `/dashboard`
- Shows all 24 tools with category filtering
- Tracks usage count (stored in localStorage)
- Shows recently used tools
- Account tab shows profile + usage stats

**Usage tracking:**
- Stored in browser localStorage (key: `sta_usage`)
- 50 free runs per month
- Resets when user clears browser storage
- Upgradeable to server-side tracking when you add a database

---

## 7. TypeScript note

If TypeScript complains about `session.user.id`, add this to your project:

```ts
// types/next-auth.d.ts
import "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
```
