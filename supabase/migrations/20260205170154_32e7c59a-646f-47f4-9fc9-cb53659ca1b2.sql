-- Add new columns to pill_detections table
ALTER TABLE public.pill_detections 
ADD COLUMN generic_name text,
ADD COLUMN drug_class text,
ADD COLUMN size text,
ADD COLUMN shape text;