require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const templatesRouter = require('./routes/templates');
const sendTestEmailRouter = require('./routes/sendTestEmail');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Template routes
app.use('/api/templates', templatesRouter);
app.use('/api/send-test-email', sendTestEmailRouter);

// Serve built React frontend
const distPath = path.resolve(__dirname, '../client/dist');
const indexHtml = path.join(distPath, 'index.html');
console.log(`Static files path: ${distPath}`);
console.log(`index.html exists: ${fs.existsSync(indexHtml)}`);

app.use(express.static(distPath));

// Catch-all: let React Router handle non-API routes
app.get('*', (req, res) => {
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.status(404).json({ error: 'Frontend not built. Run npm run build.' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
