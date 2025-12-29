const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Simulasi beban CPU
function cpuHeavyTask(durationMs) {
  const start = Date.now();
  while (Date.now() - start < durationMs) {
    Math.sqrt(Math.random());
  }
}

// API endpoint
app.get("/api", (req, res) => {
  cpuHeavyTask(100); // trigger autoscaling

  res.json({
    message: "Hello from Cloud App 🚀",
    hostname: os.hostname(),
    pid: process.pid,
    cpu: os.loadavg(),
    time: new Date().toLocaleString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Cloud App running on port ${PORT}`);
});
