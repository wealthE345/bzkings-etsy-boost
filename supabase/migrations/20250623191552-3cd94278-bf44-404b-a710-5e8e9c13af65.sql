
-- Create a profiles table to store additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a table for user app purchases/downloads
CREATE TABLE public.user_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  app_name TEXT NOT NULL,
  app_type TEXT NOT NULL,
  price DECIMAL(10,2),
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_purchases
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for user_purchases
CREATE POLICY "Users can view their own purchases" 
  ON public.user_purchases 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases" 
  ON public.user_purchases 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a table for user-generated content (like email campaigns, movie clips, etc.)
CREATE TABLE public.user_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_type TEXT NOT NULL, -- 'email_campaign', 'movie_clip', 'keyword_research', etc.
  title TEXT NOT NULL,
  content JSONB, -- Store flexible content data
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_content
ALTER TABLE public.user_content ENABLE ROW LEVEL SECURITY;

-- Create policies for user_content
CREATE POLICY "Users can view their own content" 
  ON public.user_content 
  FOR SELECT 
  USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users can create their own content" 
  ON public.user_content 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content" 
  ON public.user_content 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content" 
  ON public.user_content 
  FOR DELETE 
  USING (auth.uid() = user_id);
