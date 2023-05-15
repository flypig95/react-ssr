import express from 'express';

const app = express();
app.use(express.static("dist"));

app.get('*', function(req, res) {
    res.send('server12345');
})

const server = app.listen(9001, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
  });