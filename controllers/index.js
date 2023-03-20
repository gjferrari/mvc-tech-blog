const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/", homeRoutes);
router.unsubscribe("/", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
