-- Create vet_services table
CREATE TABLE public.vet_services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  specialty text NOT NULL,
  county text NOT NULL,
  location text NOT NULL,
  phone text NOT NULL,
  email text,
  rating numeric DEFAULT 0,
  years_experience integer DEFAULT 0,
  available boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vet_services ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view vet services
CREATE POLICY "Vet services are viewable by everyone"
ON public.vet_services
FOR SELECT
USING (true);

-- Policy: Only authenticated users can insert (for admin purposes)
CREATE POLICY "Authenticated users can insert vet services"
ON public.vet_services
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create farm_equipment_uploads table
CREATE TABLE public.farm_equipment_uploads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  equipment_name text NOT NULL,
  equipment_type text NOT NULL,
  description text,
  image_url text NOT NULL,
  county text NOT NULL,
  price numeric,
  contact_phone text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.farm_equipment_uploads ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all equipment uploads
CREATE POLICY "Equipment uploads are viewable by everyone"
ON public.farm_equipment_uploads
FOR SELECT
USING (true);

-- Policy: Users can insert their own equipment uploads
CREATE POLICY "Users can insert their own equipment uploads"
ON public.farm_equipment_uploads
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own equipment uploads
CREATE POLICY "Users can update their own equipment uploads"
ON public.farm_equipment_uploads
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can delete their own equipment uploads
CREATE POLICY "Users can delete their own equipment uploads"
ON public.farm_equipment_uploads
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_farm_equipment_uploads_updated_at
BEFORE UPDATE ON public.farm_equipment_uploads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for equipment images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('equipment-images', 'equipment-images', true);

-- Storage policies for equipment images
CREATE POLICY "Equipment images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'equipment-images');

CREATE POLICY "Authenticated users can upload equipment images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'equipment-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own equipment images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'equipment-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own equipment images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'equipment-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Insert sample vet services for different counties
INSERT INTO public.vet_services (name, specialty, county, location, phone, email, rating, years_experience) VALUES
('Dr. James Mwangi', 'Large Animals & Cattle', 'Nairobi', 'Karen, Nairobi', '+254-712-345-678', 'jmwangi@vet.co.ke', 4.8, 15),
('Dr. Sarah Njeri', 'Poultry & Small Animals', 'Nairobi', 'Westlands, Nairobi', '+254-723-456-789', 'snjeri@vet.co.ke', 4.9, 12),
('Dr. Peter Ochieng', 'Dairy Cattle Specialist', 'Kiambu', 'Kikuyu, Kiambu', '+254-734-567-890', 'pochieng@vet.co.ke', 4.7, 18),
('Dr. Grace Wanjiku', 'General Veterinary', 'Kiambu', 'Ruiru, Kiambu', '+254-745-678-901', 'gwanjiku@vet.co.ke', 4.6, 10),
('Dr. John Kamau', 'Livestock & Nutrition', 'Nakuru', 'Nakuru Town', '+254-756-789-012', 'jkamau@vet.co.ke', 4.8, 20),
('Dr. Mary Akinyi', 'Poultry Health', 'Nakuru', 'Naivasha, Nakuru', '+254-767-890-123', 'makinyi@vet.co.ke', 4.7, 14),
('Dr. David Kipchoge', 'Sheep & Goats', 'Uasin Gishu', 'Eldoret', '+254-778-901-234', 'dkipchoge@vet.co.ke', 4.9, 16),
('Dr. Lucy Cherono', 'General Practice', 'Uasin Gishu', 'Turbo, Eldoret', '+254-789-012-345', 'lcherono@vet.co.ke', 4.5, 8);