export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/pub_8c34adcf-631d-4e05-ae24-d9cf72bcaaac/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`
        },
        body: JSON.stringify({ 
          email: email, 
          reactivate_existing: false, 
          send_welcome_email: false 
        })
      }
    );

    const data = await response.json();
    console.log('Beehiiv status:', response.status);
    console.log('Beehiiv response:', JSON.stringify(data));

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: data });
    }
  } catch(e) {
    console.log('Error:', e.message);
    res.status(500).json({ error: e.message });
  }
}
