const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route       POST api/contract/createRecord
// @desc        Creating Record for seafarer
// @access      Private
router.post(
  "/createRecord",
  [
    auth,
    [
      check("name", "Name is required!").not().isEmpty(),
      check("dateOfBirth", "dateOfBirth is required!").not().isEmpty(),
      check("cdn", "CDN is re is required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const serviceTimeRecord = {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        cdn: req.body.dateOfBirth,
        recordId: req.body.name.replace(" ", "").concat(req.body.cdn),
        seaTime: "00",
        status: "GRAD",
        rank: "Cadet",
        dateReg: String(new Date()),
        serviceTimes: [],
      };

      //Add chaincode creating code here
      console.log(`creating record by ${user}`);
      console.log(`Record is ${serviceTimeRecord.name}`);
      //Add chaincode creating code here --END

      res.json(serviceTimeRecord);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       GET api/contract/query-service/:id
// @desc        Get service for user
// @access      Public
router.get("/query-service/:id", async (req, res) => {
  try {
    //Add chaincode creating code here
    console.log(`geting service for id ${req.params.id}`);

    //Add chaincode creating code here

    res.json("OK");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
