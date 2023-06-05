import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  console.log(req);
  res.send("This is auth endpoint");
});

export default router;
