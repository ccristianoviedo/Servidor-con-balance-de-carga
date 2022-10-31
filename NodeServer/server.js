const express = require("express");

const app = express();

const PORT = parseInt(process.argv[2] || 8080)


app.get("/api/randoms", (req, res) => {
  console.log(`port: ${PORT}`);
  let aleatorio = Math.floor(Math.random() * 1000);
  const numCPUs = require("os").cpus().length;

  res.json(
    {
      numero_aleatorio :aleatorio,
      puerto: PORT,
      cpus:numCPUs
    }
  );
});
app.get("", (req, res) => {
  console.log(`port: ${PORT}`);
  res.send(
    `Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`
  );
});

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});