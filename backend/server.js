// backend/server.js
import express from 'express';
import fileUpload from 'express-fileupload';
import path, { join } from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = 8000;

// Enable files upload
app.use(fileUpload({
  createParentPath: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(join(__dirname, '../frontend/public')));

// API endpoint for health check
app.get('/ping', (req, res) => {
  res.send('pong');
});

// API endpoint for file upload
app.post('/upload', (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  uploadPath = join(__dirname, 'uploads', sampleFile.name);

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
