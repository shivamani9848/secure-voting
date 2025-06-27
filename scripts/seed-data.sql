-- Insert sample candidates for testing

INSERT INTO candidates (name, party, symbol, description, age, education, constituency, state) VALUES
('राहुल शर्मा / Rahul Sharma', 'Indian National Congress', '🤚', 'Experienced leader focused on development and education', 45, 'M.A. Political Science', 'Mumbai North', 'Maharashtra'),
('प्रिया पटेल / Priya Patel', 'Bharatiya Janata Party', '🪷', 'Young leader committed to digital India and job creation', 38, 'MBA, B.Tech', 'Mumbai North', 'Maharashtra'),
('अमित कुमार / Amit Kumar', 'Aam Aadmi Party', '🧹', 'Anti-corruption activist working for transparent governance', 42, 'LLB, Social Work', 'Mumbai North', 'Maharashtra'),
('सुनीता देवी / Sunita Devi', 'Independent', '⚖️', 'Local leader focused on women empowerment and rural development', 50, 'M.A. Sociology', 'Mumbai North', 'Maharashtra');

-- Insert sample election
INSERT INTO elections (name, description, start_date, end_date, is_active) VALUES
('Lok Sabha Elections 2024', 'General Elections for Lok Sabha', '2024-04-01 09:00:00', '2024-06-01 18:00:00', true);

-- Insert sample user for testing (password: 'password123')
INSERT INTO users (voter_id, email, password_hash, mobile, state, constituency, is_verified) VALUES
('ABC123456789', 'test@example.com', '$2b$10$rQZ9QmjQZ9QmjQZ9QmjQZO', '+91 9876543210', 'Maharashtra', 'Mumbai North', true);
