const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// READ
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// UPDATE
router.put("/:rollNo", async (req, res) => {
  const updated = await Student.findOneAndUpdate(
    { rollNo: req.params.rollNo },
    req.body,
    { new: true }
  );
  res.send(updated);
});

// DELETE
router.delete("/:rollNo", async (req, res) => {
  await Student.findOneAndDelete({ rollNo: req.params.rollNo });
  res.send("Deleted");
});

module.exports = router;