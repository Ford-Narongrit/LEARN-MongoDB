//import
var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");

//link to MongoDB Atlas
//myFirstDatabase is Database name (can be change)
var uri = "mongodb+srv://mongo-test-user:Ff_0910957832@mongodb-test.djpod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => {
    console.log("[success] Connecting to database : connected to the database");
  },
  error => {
    console.log("[failed] Connecting to database " + error);
    process.exit();
  }
);

var app = express();
//ทำให้ ดึง Uri ไปใช้ได้
app.use(cors());
// คำสั่งสำหรับแปลงค่า JSON ให้สามารถดึงและส่งค่าไปยัง MongoDB Atlas ได้
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup path
var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("[success] Server is running : listening on http://localhost:" + port);
});


// ข้อความสำหรับ path หน้าแรกของ express เรา (localhost:5000/)
app.get("/", (req, res) => {
  res.status(200).send("หน้าแรกของ api express");
});


// path สำหรับ MongoDB ของเรา
var Product = require("./router/product");
app.use("/api/product", Product);


// ข้อความสำหรับใส่ path ผิด (localhost:5000/asdfghjkl;)
app.use((req, res, next) => {
  var err = new Error("path not found");
  err.status = 404;
  next(err);
});

