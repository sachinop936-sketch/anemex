
-- Add customer details and enhanced fields to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_phone text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_address text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_city text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_state text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_pincode text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method text DEFAULT 'online';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Add delivery charges and tax to store_settings
ALTER TABLE public.store_settings ADD COLUMN IF NOT EXISTS delivery_charges numeric DEFAULT 0;
ALTER TABLE public.store_settings ADD COLUMN IF NOT EXISTS free_delivery_above numeric DEFAULT 100;
ALTER TABLE public.store_settings ADD COLUMN IF NOT EXISTS tax_percent numeric DEFAULT 0;

-- Enable realtime for key tables so all users see live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.banners;
ALTER PUBLICATION supabase_realtime ADD TABLE public.store_settings;

-- Allow admin to update orders (for status changes)
CREATE POLICY "Admin can update orders"
ON public.orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
