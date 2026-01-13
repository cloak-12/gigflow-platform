const Gig = require("../models/Gig");

exports.createGig = async (req, res) => {
  try {
    console.log("USER ID:", req.userId); // DEBUG
    console.log("BODY:", req.body);       // DEBUG

    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.userId
    });

    res.json(gig);
  } catch (err) {
    console.error("CREATE GIG ERROR:", err);
    res.status(500).json({ msg: "Gig creation failed" });
  }
};

exports.getGigs = async (req, res) => {
  try {
    const query = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" }, status: "open" }
      : { status: "open" };

    const gigs = await Gig.find(query);
    res.json(gigs);
  } catch (err) {
    console.error("GET GIG ERROR:", err);
    res.status(500).json({ msg: "Fetch failed" });
  }
};
