-- Create table for pill detections history
CREATE TABLE public.pill_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pill_name TEXT NOT NULL,
  confidence NUMERIC(5,2) NOT NULL,
  manufacturer TEXT,
  dosage TEXT,
  description TEXT,
  warnings TEXT[],
  image_url TEXT,
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public read for demo purposes)
ALTER TABLE public.pill_detections ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read detections (for demo/educational purposes)
CREATE POLICY "Anyone can view pill detections" 
ON public.pill_detections 
FOR SELECT 
USING (true);

-- Allow anyone to insert detections (for demo)
CREATE POLICY "Anyone can add pill detections" 
ON public.pill_detections 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.pill_detections;