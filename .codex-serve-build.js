const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3002;
const root = path.join(__dirname, "build");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function sendFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const safePath = decodeURIComponent((req.url || "/").split("?")[0]);
  const relativePath = safePath === "/" ? "/index.html" : safePath;
  const candidatePath = path.normalize(path.join(root, relativePath));
  const filePath = candidatePath.startsWith(root) ? candidatePath : path.join(root, "index.html");

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      sendFile(filePath, res);
      return;
    }

    sendFile(path.join(root, "index.html"), res);
  });
});

server.listen(port, "127.0.0.1");
