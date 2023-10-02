// MUSTAFA VURAL //
// cevaplar model ve şema mongodb için // 24.09.2023
const {model ,Schema,Types} =require("mongoose")


module.exports = model(
  "Answer",
  new Schema({
    answer: {
      type: String,
      require: "Cevap boş geçilemez.",
    },
    user: {
      type: Types.ObjectId,
      ref: "employees",
      require: "user boş geçme",
    },
    survey: {
      type: String,
      require: "survey boş geçme",
    },
  })
);