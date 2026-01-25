import axios from "axios";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = "https://loerotzzthiraxkqadnf.supabase.co"
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZXJvdHp6dGhpcmF4a3FhZG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjY4NTMsImV4cCI6MjA3NjIwMjg1M30.jsjBzHN6HAofKy-7AJdUWgVuL_WhWpBddD4w2uU-DIQ"

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL e Key são obrigatórios no .env");
}

const api = axios.create({
    baseURL: `${supabaseUrl}/rest/v1`, 
    headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation" 
    }
});

export { api };