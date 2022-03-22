const router = require("express").Router();
const { upload, cloudinary } = require("../config/cloudinary");

router.post("/", upload.single("image"), async (req, res) => {
  return res.json({ data: req.file });
});

router.delete("/", async (req, res) => {
  const { public_id } = req.body;

  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });
    return res.json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error delete assets" });
  }
});

module.exports = router;
