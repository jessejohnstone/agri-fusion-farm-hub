-- Create machinery hire listings table
CREATE TABLE public.machinery_hire (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  machinery_name TEXT NOT NULL,
  machinery_type TEXT NOT NULL,
  description TEXT,
  hourly_rate NUMERIC NOT NULL,
  daily_rate NUMERIC,
  location TEXT NOT NULL,
  county TEXT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT true,
  contact_phone TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.machinery_hire ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Machinery hire listings are viewable by everyone"
ON public.machinery_hire
FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own machinery hire listings"
ON public.machinery_hire
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own machinery hire listings"
ON public.machinery_hire
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own machinery hire listings"
ON public.machinery_hire
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_machinery_hire_county ON public.machinery_hire(county);
CREATE INDEX idx_machinery_hire_available ON public.machinery_hire(available);

-- Add trigger for updated_at
CREATE TRIGGER update_machinery_hire_updated_at
BEFORE UPDATE ON public.machinery_hire
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();