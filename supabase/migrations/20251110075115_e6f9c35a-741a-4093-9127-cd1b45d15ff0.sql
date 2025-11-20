-- Fix search_path for get_product_rating function
CREATE OR REPLACE FUNCTION public.get_product_rating(product_uuid UUID)
RETURNS NUMERIC 
LANGUAGE SQL 
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(AVG(rating), 0)
  FROM product_reviews
  WHERE product_id = product_uuid;
$$;