const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/json", (req, res) => {
  setTimeout(() => {
    res.sendFile(path.resolve(process.cwd(), "public/api/newData.json"));
  }, 2000);
});

app.listen(3001, () => {
  console.log("api服务启动，3001");
});
