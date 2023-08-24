const Bills = require("../models/billsModel.js");

//for add
exports.addBillsController = async (req, res) => {
  try {
    const newBills = new Bills(req.body);
    await newBills.save();
    res.send("Bill Created Successfully!");
  } catch (error) {
    console.log(error);
  }
};

//for get
exports.getBillsController = async (req, res) => {
  try {
    const bills = await Bills.find({});
    //console.log(bills);
    res.status(200).json(bills);
  } catch (error) {
    console.log(error);
  }
};
