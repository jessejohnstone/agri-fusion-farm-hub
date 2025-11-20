-- Add county column to profiles table
ALTER TABLE public.profiles ADD COLUMN county text;

-- Create index for better performance on county queries
CREATE INDEX idx_profiles_county ON public.profiles(county);