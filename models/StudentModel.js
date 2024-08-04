const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "please Enter Student ID"],
    },
    name: {
      type: String,
      required: [true, "please Enter Student Name"],
    },
    status: {
      type: String,
      required: [true, "please Enter Status"],
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('students',studentSchema);
module.exports = Student;
