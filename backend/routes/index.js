const auth = require("../modules/auth/auth.routes");
const searches = require("../modules/searches/searches.routes");
// const users = require("../modules/users/users.routes");
const router = require("express").Router();

router.use("/auth", auth);
router.use("/searches", searches);
// router.use("/users", users);

module.exports = router;
