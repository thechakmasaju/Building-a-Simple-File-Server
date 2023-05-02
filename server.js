const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filename = req.url === '/' ? 'index.html' : req.url.slice(1);
  filename = path.join(__dirname, 'public', filename);
  fs.readFile(filename, (err, content) => {
    if (err) {
      console.log(`Error reading file ${filename}: ${err}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
    } else {
      console.log(`Sending file ${filename}`);
      const ext = path.extname(filename);
      let contentType = 'text/plain';
      switch (ext) {
        case '.html':
          contentType = 'text/html';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(content);
      res.end();
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
