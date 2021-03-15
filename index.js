const express = require("express");
const PORT = 8000;
const app = express();
const fs = require("fs");
let data = require("./IP.json");
app.get("/api/event", (req, res) => {
  const parseIp = req.connection.remoteAddress;
  if (data[parseIp]) {
    let count = data[parseIp] + 1;
    data[parseIp] = count;
  } else {
    data[parseIp] = 1;
  }
  console.log(data[parseIp]);
  const response = {
    IP: parseIp,
    count: data[parseIp],
  };
  fs.writeFile("IP.json", JSON.stringify(data), function (err) {
    if (err) throw err;
  });
  res.send(response);
});
app.listen(PORT);
console.log(`Running on http://0.0.0.0:${PORT}`);
