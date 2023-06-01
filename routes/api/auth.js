const express = require("express");

const upload = require("../../middllwares/upload");

const validateBody = require("../../middllwares/validateBody");

const validateSubscription = require("../../middllwares/validateSubscription");

const validateBodyOneField = require("../../middllwares/validateBodyFavorite");

const ctrl = require("../../controllers/auth");

const {
  registerSchema,
  loginSchema,
  updateSchema,
  emailSchema,
} = require("../../models/user");

const authentication = require("../../middllwares/authentication");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBodyOneField(emailSchema), ctrl.sendVerifyEmail);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post("/logout", authentication, ctrl.logout);

router.get("/current", authentication, ctrl.getCurrentUser);

router.patch(
  "/",
  authentication,
  validateSubscription(updateSchema),
  ctrl.update
);

router.patch(
  "/avatars",
  authentication,
  upload.single("avatarURL"),
  ctrl.uploadAvatar
);

module.exports = router;
