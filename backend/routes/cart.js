const express = require("express");
const Item = require("../models/itemModel");
const mongoose = require("mongoose")

const router = express.Router();

//add to cart

router.post("/", async (req, res) => {
  const { food, quantity } = req.body;

let emptyFields = [];

if (!food) {
    emptyFields.push("food");
}

if (!quantity || Number(quantity) <= 0) {
    emptyFields.push("quantity");
}

if (emptyFields.length > 0) {
    return res.status(400).json({
        error: "Food/Quantity should not be empty",
        emptyFields
    });
  }

  try {
    const item = await Item.create({ food, quantity });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get cart items

router.get("/", async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
});

//delete cart item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such item"})
  }
  const item = await Item.findOneAndDelete({_id:id})
  if(!item){
    return res.status(404).json({error:"No such item"})
  }
  res.status(200).json(item)
});

//change quantity of item
router.patch("/:id", async(req, res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such item"})
    }
    console.log("One")
    const item = await Item.findOneAndUpdate({_id:id}, {...req.body}, {new:true})
    console.log("two")
    if(!item){
        return res.status(404).json({error:"No such item"})
    }
    res.status(200).json(item)
})

module.exports = router