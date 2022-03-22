const router = require("express").Router();

const {
  addSponsor,
  getSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
} = require("../controllers/sponsors");

router.post("/", addSponsor);
router.get("/", getSponsors);
router.get("/:id", getSponsorById);
router.put("/:id", updateSponsor);
router.delete("/:id", deleteSponsor);

module.exports = router;
