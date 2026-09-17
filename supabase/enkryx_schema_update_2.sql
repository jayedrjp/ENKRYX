-- ============================================================
-- ENKRYX — HR fields for Create Employee redesign
-- Run this once in Supabase SQL Editor (after prior migrations)
-- ============================================================

-- New profile fields.
-- NOTE on "role": the existing `role` column (admin/employee) controls
-- system permissions via RLS and must stay exactly admin/employee — it is
-- NOT the same as the new `job_role` field below, which is purely an HR
-- label (Admin/Manager/Team Lead/Employee/HR) shown in the UI. Every
-- employee created through this form still gets system role = 'employee'.
alter table public.profiles
  add column if not exists employee_id text unique,
  add column if not exists phone text,
  add column if not exists job_role text,
  add column if not exists employment_type text,
  add column if not exists joining_date date,
  add column if not exists work_location text,
  add column if not exists photo_url text;

-- ------------------------------------------------------------
-- Auto-generated Employee IDs: EMP-<year>-<sequential number>
-- A real sequence avoids collisions that a "count existing rows" approach
-- could hit if two employees were created at the same moment.
-- ------------------------------------------------------------
create sequence if not exists public.employee_id_seq start 1;

create or replace function public.generate_employee_id()
returns text
language sql
as $$
  select 'EMP-' || extract(year from now())::text || '-' ||
         lpad(nextval('public.employee_id_seq')::text, 3, '0');
$$;

-- Update the signup trigger to also fill in the new fields from metadata,
-- and auto-assign the Employee ID (never client-supplied).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id, name, email, role, designation, department,
    employee_id, phone, job_role, employment_type, joining_date, work_location
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'employee'),
    new.raw_user_meta_data->>'designation',
    new.raw_user_meta_data->>'department',
    public.generate_employee_id(),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'job_role',
    new.raw_user_meta_data->>'employment_type',
    nullif(new.raw_user_meta_data->>'joining_date', '')::date,
    new.raw_user_meta_data->>'work_location'
  );
  return new;
end;
$$;

-- ------------------------------------------------------------
-- Storage bucket for employee profile photos
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('employee-photos', 'employee-photos', true)
on conflict (id) do nothing;

drop policy if exists "Admins can upload employee photos" on storage.objects;
create policy "Admins can upload employee photos"
  on storage.objects for insert
  with check (bucket_id = 'employee-photos' and public.is_admin());

drop policy if exists "Admins can update employee photos" on storage.objects;
create policy "Admins can update employee photos"
  on storage.objects for update
  using (bucket_id = 'employee-photos' and public.is_admin());

drop policy if exists "Admins can delete employee photos" on storage.objects;
create policy "Admins can delete employee photos"
  on storage.objects for delete
  using (bucket_id = 'employee-photos' and public.is_admin());

drop policy if exists "Anyone can view employee photos" on storage.objects;
create policy "Anyone can view employee photos"
  on storage.objects for select
  using (bucket_id = 'employee-photos');
