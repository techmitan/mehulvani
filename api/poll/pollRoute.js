const router = require("express").Router();
const controller = require("./pollController");

router.route("/").post(controller.addPoll).get(controller.getPolls);

router.get("/get", controller.getPoll);

router.route("/:id").put(controller.answerPoll);

module.exports = router;
