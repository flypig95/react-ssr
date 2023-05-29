const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/json", (req, res) => {
  setTimeout(() => {
    res.sendFile(path.resolve(process.cwd(), "public/api/newData.json"));
    // res.json({name: 'chencong'})
  }, 3000);
});

app.listen(9002, () => {
  console.log("9002");
});
