-- Run this in Supabase → SQL Editor

create table if not exists public.users (
  id          text primary key,           -- Google sub ID
  email       text not null unique,
  name        text,
  image       text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Index for email lookups
create index if not exists users_email_idx on public.users (email);

-- Enable RLS
alter table public.users enable row level security;

-- Only service role can read/write (NextAuth uses service role key)
create policy "Service role full access" on public.users
  for all using (true) with check (true);

-- ─── Subscriptions (required by lib/usage.ts + Stripe webhook) ────────────────
create table if not exists public.subscriptions (
  user_id                 text primary key references public.users(id) on delete cascade,
  stripe_customer_id      text,
  stripe_subscription_id  text,
  plan                    text not null default 'free',   -- 'free' | 'pro'
  status                  text,                            -- active | trialing | past_due | cancelled
  billing_interval        text,                            -- 'month' | 'year'
  current_period_end      timestamptz,
  updated_at              timestamptz default now()
);

create index if not exists subscriptions_stripe_sub_idx on public.subscriptions (stripe_subscription_id);

alter table public.subscriptions enable row level security;

create policy "Service role full access" on public.subscriptions
  for all using (true) with check (true);

-- ─── Tool usage (required by lib/usage.ts daily rate limiting) ────────────────
create table if not exists public.tool_usage (
  id          bigint generated always as identity primary key,
  user_id     text not null references public.users(id) on delete cascade,
  tool_slug   text not null,
  date        date not null default current_date,
  created_at  timestamptz default now()
);

create index if not exists tool_usage_user_date_idx on public.tool_usage (user_id, date);

alter table public.tool_usage enable row level security;

create policy "Service role full access" on public.tool_usage
  for all using (true) with check (true);
