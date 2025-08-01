-- User Profiles Migration
-- Add user_profiles table for storing onboarding questionnaire data

-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_title VARCHAR(200),
    experience_level VARCHAR(100),
    areas_of_interest TEXT[],
    primary_goals TEXT,
    industry VARCHAR(100),
    company_size VARCHAR(50),
    is_onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_onboarding_completed ON user_profiles(is_onboarding_completed);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 