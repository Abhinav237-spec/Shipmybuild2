// api/register.js
// Vercel serverless function — runs on the server, never exposed to the browser.
// Supabase keys live in Vercel Environment Variables, not in your HTML.
//
// Setup in Vercel dashboard → Project → Settings → Environment Variables:
//   SUPABASE_URL        = https://YOUR_PROJECT_ID.supabase.co
//   SUPABASE_SERVICE_KEY = your service_role key (NOT the anon key)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone } = req.body || {};

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'name, email and phone are required' });
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing Supabase env vars');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/preregistrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      }),
    });

    if (!supaRes.ok) {
      const err = await supaRes.json().catch(() => ({}));
      // Duplicate email → friendly message
      if (supaRes.status === 409 || err?.code === '23505') {
        return res.status(409).json({ error: 'This email is already registered.' });
      }
      throw new Error(err?.message || `Supabase error ${supaRes.status}`);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Registration error:', e);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
