const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const updateSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User, registerSchema, loginSchema, updateSchema };
