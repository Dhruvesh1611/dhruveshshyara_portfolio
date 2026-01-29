// Secure YouTube API proxy for Next.js
export default async function handler(req, res) {
  const { q = '', maxResults = 10, type = 'video' } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not set on server.' });
  }
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(q)}&type=${type}&key=${apiKey}`;
  try {
    const ytRes = await fetch(url);
    const data = await ytRes.json();
    if (!ytRes.ok) {
      return res.status(ytRes.status).json({ error: data.error?.message || 'YouTube API error' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
