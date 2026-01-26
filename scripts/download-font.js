const https = require('https');
const fs = require('fs');
const path = require('path');

const fontUrl = 'https://github.com/alif-type/tajawal/releases/download/v1.001/Tajawal-Bold.ttf';
const fontPath = path.join(__dirname, '..', 'public', 'fonts', 'Tajawal-Bold.ttf');

// Create fonts directory if it doesn't exist
const fontsDir = path.dirname(fontPath);
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Download the font file
const file = fs.createWriteStream(fontPath);
https.get(fontUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Successfully downloaded Tajawal font');
  });
}).on('error', (err) => {
  fs.unlink(fontPath, () => {}); // Delete the file if there's an error
  console.error('Error downloading Tajawal font:', err);
});
