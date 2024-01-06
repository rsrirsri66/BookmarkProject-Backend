const express = require('express');
const app = express();
const port = 6003;
var cors = require('cors')
app.use(cors());
const bodyParser = require('body-parser');

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, options');
//     next();
//   });
  app.use(bodyParser.json());

  app.get('/', (req,res) => {
    res.send("hello world");
  })

  require("./app/routes/routes")(app)


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});