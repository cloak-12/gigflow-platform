const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bidController = require("../controllers/bidController");

router.post("/", auth, bidController.createBid);
router.get("/:gigId", auth, bidController.getBidsForGig);
router.patch("/:bidId/hire", auth, bidController.hireBid);

module.exports = router;
