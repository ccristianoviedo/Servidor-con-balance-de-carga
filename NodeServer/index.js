const cluster = require("cluster");
const express = require("express");
const app = express();
const numCPUs = require("os").cpus().length;

const PORT = parseInt(8081);

if (cluster.isPrimary) {
  console.log("num CPUs: " + numCPUs);
  console.log(`I am a master ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} is finished`);
  });
} else {
  app
    .get("/api/randoms",(req, res) => {
      res.writeHead(200);
      res.end(
        `Servidor en ${PORT} - PID ${
          process.pid
        } - ${new Date().toLocaleString()}`
      );
    })
    .listen(PORT);
  console.log(`Worker ${process.pid} started`);
}