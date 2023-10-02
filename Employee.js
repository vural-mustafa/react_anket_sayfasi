// MUSTAFA VURAL //
// giriş için mongodb// 14.09.2023
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: {
    /* type: mongoose.Types.ObjectId(), */
    type: String,
    require: "email gerekli",
    unique: true,
    ref: "survey",
  },
  password: String,
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
