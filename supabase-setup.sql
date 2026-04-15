-- ============================================
-- GirleeBag Admin Tables Setup
-- Run this in Supabase > SQL Editor
-- ============================================

-- 1. MESSAGES (contact form submissions)
create table if not exists messages (
  id bigserial primary key,
  name text not null,
  email text not null,
  subject text,
  message text,
  archived boolean default false,
  created_at timestamp with time zone default now()
);
alter table messages enable row level security;
drop policy if exists "Allow all on messages" on messages;
create policy "Allow all on messages" on messages for all using (true) with check (true);

-- 2. ORDERS (order ledger entries)
create table if not exists orders (
  id bigserial primary key,
  product_name text not null,
  amount numeric(10,2) not null,
  customer_name text,
  created_at timestamp with time zone default now()
);
alter table orders enable row level security;
drop policy if exists "Allow all on orders" on orders;
create policy "Allow all on orders" on orders for all using (true) with check (true);

-- 3. INVENTORY (stock tracking)
create table if not exists inventory (
  id bigserial primary key,
  product_name text not null unique,
  stock_count integer default 0
);
alter table inventory enable row level security;
drop policy if exists "Allow all on inventory" on inventory;
create policy "Allow all on inventory" on inventory for all using (true) with check (true);

-- 4. LEADS (VIP email signups)
create table if not exists leads (
  id bigserial primary key,
  email text not null,
  birthday text,
  created_at timestamp with time zone default now()
);
alter table leads enable row level security;
drop policy if exists "Allow all on leads" on leads;
create policy "Allow all on leads" on leads for all using (true) with check (true);

-- 5. BUSINESS METRICS (performance stats)
create table if not exists business_metrics (
  id integer primary key,
  sales numeric(12,2) default 0,
  sales_trend numeric(5,2) default 0,
  customers integer default 0,
  carts integer default 0
);
alter table business_metrics enable row level security;
drop policy if exists "Allow all on business_metrics" on business_metrics;
create policy "Allow all on business_metrics" on business_metrics for all using (true) with check (true);

-- Insert the single metrics row (id=1)
insert into business_metrics (id, sales, sales_trend, customers, carts)
values (1, 0, 0, 0, 0) on conflict (id) do nothing;

-- ============================================
-- Done! All 5 admin tables are ready.
-- ============================================
