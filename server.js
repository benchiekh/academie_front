const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, 'dist')));

// Toutes les routes redirigées vers index.html (pour React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Frontend server running on port ${port}`);
});
