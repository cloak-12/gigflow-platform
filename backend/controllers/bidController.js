const mongoose = require("mongoose");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");
const socket = require("../socket");


exports.createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    // Prevent duplicate bid by same freelancer
    const existing = await Bid.findOne({
      gigId,
      freelancerId: req.user.id
    });

    if (existing) {
      return res.status(400).json({ msg: "Already bid on this gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price
    });

    res.json(bid);
  } catch (err) {
    console.error("CREATE BID ERROR:", err);
    res.status(500).json({ msg: "Bid creation failed" });
  }
};


exports.getBidsForGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) return res.status(404).json({ msg: "Gig not found" });

    // Only owner can see bids
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate("freelancerId", "name email");

    res.json(bids);
  } catch (err) {
    console.error("GET BIDS ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch bids" });
  }
};


exports.hireBid = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) throw new Error("Bid not found");

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) throw new Error("Gig not found");

    if (gig.status === "assigned") {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Already assigned" });
    }

    // Assign gig
    gig.status = "assigned";
    await gig.save({ session });

    // Mark chosen bid as hired
    bid.status = "hired";
    await bid.save({ session });

    // Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

  
    const io = socket.getIO();
    io.to(bid.freelancerId.toString()).emit("hired", {
      message: "You have been hired for this project!",
      gigId: gig._id
    });

    res.json({ msg: "Hired successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("HIRE ERROR:", err);
    res.status(500).json({ msg: "Hiring failed" });
  }
};
