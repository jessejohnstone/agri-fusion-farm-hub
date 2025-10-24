-- Create equipment blockchain table for provenance tracking
CREATE TABLE public.equipment_blockchain (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id uuid REFERENCES public.farm_equipment_uploads(id) ON DELETE CASCADE NOT NULL,
  block_hash text NOT NULL UNIQUE,
  previous_hash text,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  event_type text NOT NULL, -- 'ownership_transfer', 'maintenance', 'inspection', 'upload'
  event_data jsonb NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create supply chain records table
CREATE TABLE public.supply_chain_records (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name text NOT NULL,
  product_type text NOT NULL, -- 'crop', 'livestock', 'processed'
  batch_id text NOT NULL,
  chain_hash text NOT NULL UNIQUE,
  previous_hash text,
  stage text NOT NULL, -- 'harvested', 'processed', 'packaged', 'in_transit', 'delivered'
  location text NOT NULL,
  county text NOT NULL,
  metadata jsonb,
  user_id uuid NOT NULL,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user tokens table
CREATE TABLE public.user_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  balance numeric NOT NULL DEFAULT 0,
  total_earned numeric NOT NULL DEFAULT 0,
  total_spent numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create token transactions table
CREATE TABLE public.token_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  amount numeric NOT NULL,
  transaction_type text NOT NULL, -- 'earned', 'spent', 'transfer'
  reason text NOT NULL,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.equipment_blockchain ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supply_chain_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for equipment_blockchain
CREATE POLICY "Equipment blockchain records are viewable by everyone"
  ON public.equipment_blockchain FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own blockchain records"
  ON public.equipment_blockchain FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for supply_chain_records
CREATE POLICY "Supply chain records are viewable by everyone"
  ON public.supply_chain_records FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own supply chain records"
  ON public.supply_chain_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own supply chain records"
  ON public.supply_chain_records FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_tokens
CREATE POLICY "Users can view their own tokens"
  ON public.user_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own token record"
  ON public.user_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own token balance"
  ON public.user_tokens FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for token_transactions
CREATE POLICY "Users can view their own transactions"
  ON public.token_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON public.token_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_equipment_blockchain_equipment_id ON public.equipment_blockchain(equipment_id);
CREATE INDEX idx_equipment_blockchain_user_id ON public.equipment_blockchain(user_id);
CREATE INDEX idx_supply_chain_batch_id ON public.supply_chain_records(batch_id);
CREATE INDEX idx_supply_chain_user_id ON public.supply_chain_records(user_id);
CREATE INDEX idx_token_transactions_user_id ON public.token_transactions(user_id);

-- Trigger for updated_at on user_tokens
CREATE TRIGGER update_user_tokens_updated_at
  BEFORE UPDATE ON public.user_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to award tokens
CREATE OR REPLACE FUNCTION public.award_tokens(
  p_user_id uuid,
  p_amount numeric,
  p_reason text,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert or update user tokens
  INSERT INTO public.user_tokens (user_id, balance, total_earned)
  VALUES (p_user_id, p_amount, p_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET
    balance = user_tokens.balance + p_amount,
    total_earned = user_tokens.total_earned + p_amount,
    updated_at = now();
  
  -- Record transaction
  INSERT INTO public.token_transactions (user_id, amount, transaction_type, reason, metadata)
  VALUES (p_user_id, p_amount, 'earned', p_reason, p_metadata);
END;
$$;

-- Function to create blockchain hash
CREATE OR REPLACE FUNCTION public.generate_block_hash(
  p_equipment_id uuid,
  p_previous_hash text,
  p_event_type text,
  p_event_data jsonb,
  p_timestamp timestamp with time zone
)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  v_hash_input text;
BEGIN
  v_hash_input := p_equipment_id::text || 
                  COALESCE(p_previous_hash, 'genesis') || 
                  p_event_type || 
                  p_event_data::text || 
                  extract(epoch from p_timestamp)::text;
  
  RETURN encode(digest(v_hash_input, 'sha256'), 'hex');
END;
$$;

-- Function to create supply chain hash
CREATE OR REPLACE FUNCTION public.generate_chain_hash(
  p_batch_id text,
  p_previous_hash text,
  p_stage text,
  p_metadata jsonb,
  p_timestamp timestamp with time zone
)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  v_hash_input text;
BEGIN
  v_hash_input := p_batch_id || 
                  COALESCE(p_previous_hash, 'genesis') || 
                  p_stage || 
                  COALESCE(p_metadata::text, '{}') || 
                  extract(epoch from p_timestamp)::text;
  
  RETURN encode(digest(v_hash_input, 'sha256'), 'hex');
END;
$$;