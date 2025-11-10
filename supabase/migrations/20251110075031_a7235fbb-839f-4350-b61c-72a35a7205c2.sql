-- Add reviews table
CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES marketplace_products(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Reviews are viewable by everyone
CREATE POLICY "Reviews are viewable by everyone" 
ON public.product_reviews 
FOR SELECT 
USING (true);

-- Buyers can insert reviews for products they purchased
CREATE POLICY "Buyers can insert reviews for their purchases" 
ON public.product_reviews 
FOR INSERT 
WITH CHECK (
  auth.uid() = buyer_id AND 
  EXISTS (
    SELECT 1 FROM order_items 
    WHERE order_items.order_id = product_reviews.order_id 
    AND order_items.product_id = product_reviews.product_id
  )
);

-- Add average rating to products (computed via function)
CREATE OR REPLACE FUNCTION get_product_rating(product_uuid UUID)
RETURNS NUMERIC AS $$
  SELECT COALESCE(AVG(rating), 0)
  FROM product_reviews
  WHERE product_id = product_uuid;
$$ LANGUAGE SQL STABLE;

-- Update orders table to allow sellers to view orders containing their products
CREATE POLICY "Sellers can view orders containing their products" 
ON public.orders 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM order_items 
    WHERE order_items.order_id = orders.id 
    AND order_items.seller_id = auth.uid()
  )
);

-- Allow sellers to update order status (for their items)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'pending';

-- Update order_items to track individual item status
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';