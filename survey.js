// MUSTAFA VURAL //
// anket model ve şema mongodb için // 24.09.2023
const { model, Schema } = require("mongoose");

module.exports = model(
  "Survey",
  new Schema(
    {
      title: {
        type: String,
        required: "title boş geçilemez",
      },
      answers: {
        type: Array,
        required: "answers boş geçilemez",
      },
    },
    {
      timestamps: true,
    }
  )
);
