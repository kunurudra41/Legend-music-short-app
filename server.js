const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// MongoDB connection (replace with your actual connection string)
mongoose.connect('mongodb+srv://kunurudra41:Kunudon@41@cluster0.2oec4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Song Schema and Model
const songSchema = new mongoose.Schema({
  title: String,
  filePath: String,
  fileName: String,
});

const Song = mongoose.model('Song', songSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/music'); // Folder to save music files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
// Filter to accept only audio files (e.g., MP3)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only audio files are allowed'), false); // Reject the file
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
});

module.exports = upload;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// API: Upload a new song
app.post('/upload', upload.single('song'), async (req, res) => {
  const { originalname, path: filePath } = req.file;
  const song = new Song({
    title: originalname,
    filePath: `/music/${req.file.filename}`, // Relative path for serving
    fileName: req.file.filename,
  });

  try {
    const song = new Song ({
      title: req.file.originalname,
      filepath:`/music/${req.file.filename}`,
    })
    await song.save();
    res.status(200).json({ message: 'Song uploaded successfully', song });
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload song' });
  }
});

// API: Get all uploaded songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Music app running at http://localhost:${port}`);
});




