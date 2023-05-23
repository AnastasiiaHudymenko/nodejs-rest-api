const express = require("express");

const router = express.Router();

const ctrs = require("../../controllers/contacts");

const validateBody = require("../../middllwares/validateBody");

const isValidId = require("../../middllwares/isValidId");

const authentication = require("../../middllwares/authentication");

const validateBodyFavorite = require("../../middllwares/validateBodyFavorite");

const { schemaContact, updateFavoriteSchema } = require("../../models/contact");

router.get("/", authentication, ctrs.getAll);

router.get("/:contactId", authentication, isValidId, ctrs.getById);

router.post("/", authentication, validateBody(schemaContact), ctrs.add);

router.delete("/:contactId", authentication, isValidId, ctrs.remove);

router.put(
  "/:contactId",
  authentication,
  validateBody(schemaContact),
  ctrs.update
);

router.patch(
  "/:contactId/favorite",
  authentication,
  isValidId,
  validateBodyFavorite(updateFavoriteSchema),
  ctrs.updateStatusContact
);

module.exports = router;
