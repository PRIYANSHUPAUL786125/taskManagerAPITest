const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const authData = require("../controllers/auth");
router.post(
  "/auth/register",
  body("email").isEmail().withMessage("enter a valid email"),
  body("name").notEmpty().withMessage("name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password should be atleast 6 characters"),
  authData.registerPost
);
router.post(
  "/auth/login",
  body("email").isEmail().withMessage("please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("it must be atleast 6 characters"),
  authData.loginPost
);
router.post("/auth/logout", authData.logoutPost);

module.exports = router;
//superSecret123 Priyanshu Paul priyanshu@example.com
