const express = require("express");

const validateBody = require("../../middllwares/validateBody");

const validateSubscription = require("../../middllwares/validateSubscription");

const ctrl = require("../../controllers/auth");

const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require("../../models/user");

const authentication = require("../../middllwares/authentication");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post("/logout", authentication, ctrl.logout);

router.get("/current", authentication, ctrl.getCurrentUser);

router.patch(
  "/",
  authentication,
  validateSubscription(updateSchema),
  ctrl.update
);

module.exports = router;
