-- Allow all authenticated users to read all user profiles.
-- This is needed for:
--   1. Chat list page (view other participant's name/blood group)
--   2. Chat room page (view chat partner's profile)
--   3. Donor search results cards
--   4. Blood request matching
-- The existing "Users can view own profile" policy only allows self-reads.

CREATE POLICY "Authenticated users can view all profiles"
ON public.users FOR SELECT
TO authenticated
USING (true);
