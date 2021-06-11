var mongoose = require("mongoose");

var productSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    name: {
      type: String
    },
    price: {
      type: Number
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "product"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var product = mongoose.model("product", productSchema);
module.exports = product;