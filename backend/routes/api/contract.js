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

    res.status(200).json({ id: req.params.id, msg: "Query done" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route       PUT api/contract/add-service-time/:id
// @desc        Add service time for record
// @access      Private
router.put(
  "/add-service-time/:id",
  [
    auth,
    [
      check("vesselOwner", "vesselOwner is required!").not().isEmpty(),
      check("vesselNo", "vesselNo is required!").not().isEmpty(),
      check("dateSignIn", "dateSignIn is required!").not().isEmpty(),
      check("dateSignOff", "dateSignOff is required!").not().isEmpty(),
      check("time", "time is required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vesselOwner = req.body.vesselOwner;
    const vesselNo = req.body.vesselNo;
    const dateSignIn = req.body.dateSignIn;
    const dateSignOff = req.body.dateSignOff;
    const time = req.body.time;

    try {
      //Add chaincode creating code here
      console.log(`Adding time for id ${req.params.id}`);
      console.log(`vesselOwner ${vesselOwner}`);
      console.log(`vesselNo ${vesselNo}`);
      console.log(`dateSignIn ${dateSignIn}`);
      console.log(`dateSignOff ${dateSignOff}`);
      console.log(`time ${time}`);
      //Add chaincode creating code here - END

      res.json("record added");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/contract/promote/:id
// @desc        Promote a candidate
// @access      Private
router.put(
  "/promote/:id",
  [auth, [check("rank", "rank is required!").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const rank = req.body.rank;

    try {
      //Add chaincode creating code here
      console.log(`Promoting id ${req.params.id}`);
      console.log(`rank is ${req.body.rank}`);

      //Add chaincode creating code here

      res.json("promotion done");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/contract/retire/:id
// @desc        Reitre a candidate
// @access      Private
router.put("/retire/:id", async (req, res) => {
  try {
    //Add chaincode creating code here
    console.log(`Retiring id ${req.params.id}`);

    //Add chaincode creating code here

    res.json("Retire done");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
