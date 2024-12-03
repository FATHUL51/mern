const express = require("express");
const router = express.Router();
const Job = require("../schema/job.shema");
const dotenv = require("dotenv");
const authMiddleware = require("../middleware/auth");
dotenv.config();

router.get("/", async (req, res) => {
  const { limit, offset, salary, name } = req.query;
  // const jobs = await Job.find()({
  //   salary: { $gte: 200, $lte: salary + 8000 }.skip(offset).limit(limit),
  // });

  // const jobs = await Job.find({ salary }).skip(offset).limit(limit);

  // const jobs = await Job.find({ companyName: name, salary })
  //   .skip(offset)
  //   .limit(limit);

  // const jobs = await Job.find({
  //   companyName: { $regex: name, $options: "i" },
  // }).limit(limit);

  //const jobs = await Job.find().limit(limit).skip(offset);

  // const jobs = await Job.find({
  //   $or: [
  //     { companyName: { $regex: name, $options: "i" } },
  //     { jobPosition: { $regex: name, $options: "i" } },
  //   ],
  //   salary: { $gte: 200, $lte: salary + 8000 },
  // })
  //   .limit(limit)
  //   .skip(offset);

  const jobs = await Job.find();
  res.status(200).json(jobs);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json(job);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  const userId = req.user.id;
  if (!job) {
    return res.status(404).json({ message: "job not found" });
  }
  if (userId !== job.user.toString()) {
    return res.status(401).json({ message: "unauthorized" });
  }
  await job.deleteOne({ _id: id });
  res.status(200).json({ message: "job deleted successfully" });
});

router.post("/", authMiddleware, async (req, res) => {
  const {
    companyName,
    jobPosition,
    salary,
    jobType,
    work,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    information,
  } = req.body;
  if (!companyName || !jobPosition || !salary || !jobType || !work) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const user = req.user;
    const job = await Job.create({
      companyName,
      jobPosition,
      salary,
      jobType,
      work,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
      user: user.id,
    });
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in creating job" });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const {
    companyName,
    jobPosition,
    salary,
    jobType,
    work,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    information,
  } = req.body;

  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: "job not found" });
  }
  if (job.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    await Job.findByIdAndUpdate(id, {
      companyName,
      jobPosition,
      salary,
      jobType,
      work,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    });
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});
module.exports = router;
