const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["in_stock", "out_of_stock"] },
  godown_id:{ type: String, required: true },
  brand: { type: String, required: true },
  attributes: { type: Map, of: String },
  image_url: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
