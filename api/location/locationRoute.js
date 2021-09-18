const router = require("express").Router();
const controller = require("./locationController");

router.route("/").post(controller.addLocation).get(controller.getLocations);

router
  .route("/:id")
  .put(controller.updateLocation)
  .delete(controller.deleteLocation);

module.exports = router;
