import busboy from 'busboy';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const bb = busboy({ headers: req.headers });
  const files = [];

  bb.on('file', (fieldname, file, info) => {
    const { filename, mimeType } = info;
    // In a real scenario, you might upload this file to Cloudinary or S3 here.
    // For now, we just mock a URL and don't actually store the file.
    // file.on('data', (data) => { /* upload data somewhere */ });
    file.resume(); // We are not storing it right now
    files.push({ name: filename, url: `https://example.com/${filename}` });
  });

  bb.on('finish', () => {
    res.status(200).json({ files });
  });

  req.pipe(bb);
}
