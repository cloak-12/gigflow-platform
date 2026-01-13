const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/gigController");

router.get("/", c.getGigs);
router.post("/", auth, c.createGig);

module.exports = router;
