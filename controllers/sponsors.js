const Sponsor = require("../models/Sponsor");
const { cloudinary } = require("../config/cloudinary");

const addSponsor = async (req, res) => {
  const { name, logo, level } = req.body;

  const newSponsor = new Sponsor({
    name,
    level,
    logo: {
      src: logo.src,
      filename: logo.filename,
    },
  });

  try {
    const savedSponsor = await newSponsor.save();
    res.status(200).json(savedSponsor);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find({});
    res.status(200).json(sponsors);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSponsorById = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({
        statusCode: 404,
        message: `Sponsor with id ${req.params.id} is not found`,
      });
    }
    res.status(200).json(sponsor);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSponsor = async (req, res) => {
  const { name, logo, level } = req.body;

  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({
        statusCode: 404,
        message: `Sponsor with id ${req.params.id} is not found`,
      });
    }

    if (name) {
      sponsor.name = name;
    }
    if (level) {
      sponsor.level = level;
    }
    if (logo) {
      sponsor.logo = {
        src: logo.src,
        filename: logo.filename,
      };
    }

    const savedSponsor = await sponsor.save();

    res.status(200).json(savedSponsor);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSponsor = async (req, res) => {
  try {
    const data = await Sponsor.findByIdAndDelete(req.params.id);

    if (data?.logo?.filename) {
      await cloudinary.uploader.destroy(data?.logo?.filename, {
        resource_type: "image",
      });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addSponsor,
  getSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
};
