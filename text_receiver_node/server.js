const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET') {
    if (pathname === '/' || pathname === '/send_text.html') {
      // Serve the HTML page
      const filePath = path.join(__dirname, 'send_text.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      // Serve 404 for other GET requests
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else if (req.method === 'POST' && pathname === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // Parse the form data
      const params = new URLSearchParams(body);
      const text = params.get('text') || '';
      console.log(`Received text: ${text}`);
      // Insert the text at the cursor position
      typeText(text);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Text received and processed.');
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(8000, () => {
  console.log('Server running on port 8000');
});

const { spawn } = require('child_process');

function typeText(text) {
  const appleScriptCommand = `
    set theText to ${JSON.stringify(text)}
    set theClipboard to the clipboard
    try
      set the clipboard to theText
      tell application "System Events"
        keystroke "v" using command down
      end tell
    end try
    delay 0.1
    set the clipboard to theClipboard
  `;

  const osa = spawn('osascript', ['-e', appleScriptCommand]);

  osa.on('error', (error) => {
    console.error(`Error executing AppleScript: ${error}`);
  });

  osa.stderr.on('data', (data) => {
    console.error(`AppleScript stderr: ${data}`);
  });

  osa.on('close', (code) => {
    if (code !== 0) {
      console.error(`osascript process exited with code ${code}`);
    }
  });
}
