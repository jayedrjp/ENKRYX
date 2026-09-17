-- ============================================================
-- ENKRYX — add Designation & Department to employee profiles
-- Run this once in Supabase SQL Editor (after the original schema)
-- ============================================================

alter table public.profiles
  add column if not exists designation text,
  add column if not exists department text;

-- Update the signup trigger so newly created employees also get these
-- two fields from the metadata the Create Employee form now sends.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role, designation, department)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'employee'),
    new.raw_user_meta_data->>'designation',
    new.raw_user_meta_data->>'department'
  );
  return new;
end;
$$;
