const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

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
      check("cdn", "CDN is required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const name = req.body.name;
      const dateOfBirth = req.body.dateOfBirth;
      const cdn = req.body.cdn;

      //Add chaincode creating code here
      console.log(`creating record by ${user}`);
      // load the network configuration
      const ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "HLF_SETUP",
        "fabric-samples",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), "wallet");
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we have the required user.
      const identity = await wallet.get("admin");
      if (!identity) {
        console.log(
          'An identity for the user "admin" does not exist in the wallet'
        );
        console.log("Run the enrollAdmin.js application before retrying");
        return res.status(400).json({ msg: "No such user is register in CA" });
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "admin",
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");

      // Get the contract from the network.
      const contract = network.getContract("seaservicetime");

      // Evaluate the specified transaction.
      const result = await contract.submitTransaction(
        "createRecord",
        name,
        dateOfBirth,
        cdn
      );
      console.log(`${result}`);

      // Disconnect from the gateway.
      await gateway.disconnect();

      res.status(200).send(result.toString());
      //Add chaincode creating code here --END
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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

    const recordId = req.params.id;
    const vesselOwner = req.body.vesselOwner;
    const vesselNo = req.body.vesselNo;
    const dateSignIn = req.body.dateSignIn;
    const dateSignOff = req.body.dateSignOff;
    const time = req.body.time;

    try {
      //Add chaincode creating code here
      // load the network configuration
      const ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "HLF_SETUP",
        "fabric-samples",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), "wallet");
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we have the required user.
      const identity = await wallet.get("admin");
      if (!identity) {
        console.log(
          'An identity for the user "admin" does not exist in the wallet'
        );
        console.log("Run the enrollAdmin.js application before retrying");
        return res.status(400).json({ msg: "No such user is register in CA" });
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "admin",
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");

      // Get the contract from the network.
      const contract = network.getContract("seaservicetime");

      // Evaluate the specified transaction.
      const result = await contract.submitTransaction(
        "addServiceTime",
        recordId,
        vesselOwner,
        vesselNo,
        dateSignIn,
        dateSignOff,
        time
      );

      console.log(`${result}`);

      // Disconnect from the gateway.
      await gateway.disconnect();

      res.status(200).send(result.toString());
      //Add chaincode creating code here - END
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

    const recordId = req.params.id;
    const rank = req.body.rank;

    try {
      //Add chaincode creating code here
      // load the network configuration
      const ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "HLF_SETUP",
        "fabric-samples",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), "wallet");
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we have the required user.
      const identity = await wallet.get("admin");
      if (!identity) {
        console.log(
          'An identity for the user "admin" does not exist in the wallet'
        );
        console.log("Run the enrollAdmin.js application before retrying");
        return res.status(400).json({ msg: "No such user is register in CA" });
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "admin",
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");

      // Get the contract from the network.
      const contract = network.getContract("seaservicetime");

      // Evaluate the specified transaction.
      const result = await contract.submitTransaction(
        "promoteCandidate",
        recordId,
        rank
      );

      console.log(`${result}`);

      // Disconnect from the gateway.
      await gateway.disconnect();

      res.status(200).send(result.toString());

      //Add chaincode creating code here

      res.json("promotion done");
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

    //Chaincode calling
    // load the network configuration
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "HLF_SETUP",
      "fabric-samples",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we have the required user.
    const identity = await wallet.get("admin");
    if (!identity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the enrollAdmin.js application before retrying");
      return res.status(400).json({ msg: "No such user is register in CA" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("seaservicetime");

    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction(
      "queryServiceTime",
      req.params.id
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.status(200).json(JSON.parse(result.toString()));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route       PUT api/contract/retire/:id
// @desc        Reitre a candidate
// @access      Private
router.put("/retire/:id", async (req, res) => {
  const recordId = req.params.id;
  try {
    // load the network configuration
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "HLF_SETUP",
      "fabric-samples",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we have the required user.
    const identity = await wallet.get("admin");
    if (!identity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the enrollAdmin.js application before retrying");
      return res.status(400).json({ msg: "No such user is register in CA" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("seaservicetime");

    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction(
      "retireCandidate",
      recordId
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.status(200).json(JSON.parse(result.toString()));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
