const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const fs= require("fs");
const mongoose = require("mongoose");

const cors = require("cors"); 

app.use(
    cors({
      origin: "http://localhost:3000", 
    })
  );
  
  mongoose
  .connect("mongodb://127.0.0.1:27017/Tender_Management")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));


  const userSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("email is invalid");
      },
    },
  
    pass: {
      type: String,
    },
    Cpass: {
      type: String,
    },
  });
  const AdminSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("email is invalid");
      },
    },
  
    pass: {
      type: String,
    },
    Cpass: {
      type: String,
    },
  });
  const tenderSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    bufferTime: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true 
  });
  const bidSchema = new mongoose.Schema({
    tender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tender',
      required: true
    },
    status: {
      type: String,
      default: 'not assigned'
    },
    action: {
      type: String,
      default: 'BID Now'
    }
  }, {
    timestamps: true 
  });
  
  bidSchema.pre('save', async function(next) {
    const now = new Date();
    const tender = await Tender.findById(this.tender);
  
    if (!tender) {
      throw new Error('Tender not found');
    }
  
    const fiveMinutesBeforeEnd = new Date(tender.endTime.getTime() - 5 * 60 * 1000);
  
    if (now >= fiveMinutesBeforeEnd && now < tender.endTime) {
      this.action = 'BID Now';
      this.status = 'not assigned';
    } else if (now >= tender.endTime) {
      this.action = 'expired';
      this.status = 'assigned';
    }
    next();
  });
  
  const Bid = new mongoose.model('Bid', bidSchema);
  
  const Registration = new mongoose.model("Student_Registration", userSchema);
  const Tender = new mongoose.model("Tender", tenderSchema);
  const adminPannel = new mongoose.model("admin-pannel", AdminSchema);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
    try {
      const pass = req.body.pass;
      const confirmPass = req.body.cpass;
      if (pass === confirmPass) {
        const first_document = new Registration({
          name: req.body.name,
          email: req.body.email,
          pass: req.body.pass,
          Cpass: req.body.cpass,
        });
  
        const result = await first_document.save(); // To save the data into database
        console.log(result);
        res.status(201).json({ success: true });
      } else {
        res.send("Passwords are not matching");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });
  app.post("/admin-register", async (req, res) => {
    try {
      const pass = req.body.pass;
      const confirmPass = req.body.cpass;
      if (pass === confirmPass) {
        const first_document = new adminPannel({
          name: req.body.name,
          email: req.body.email,
          pass: req.body.pass,
          Cpass: req.body.cpass,
        });
  
        const result = await first_document.save(); // To save the data into database
        console.log(result);
        // res.status(201).render("index");
      } else {
        res.send("Passwords are not matching");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post("/login", async (req, res) => {
 
    try {
      const user = {
        Useremail: req.body.email,
        pass: req.body.pass
      };
  
      const result = await Registration.findOne({ email: user.Useremail });
      if (!result) {
        return res.status(400).send("Email not found");
      }
      const userName = result.name; 
      console.log(userName);
    //   const isMatch = await bcrypt.compare(user.pass, result.pass);
  
      if (result) {
        res.send({ success: true, "name": userName });
      } else {
        res.send("Passwords are not matching");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });
  app.post("/admin_login", async (req, res) => {
 
    try {
      const user = {
        Useremail: req.body.email,
        pass: req.body.pass
      };
  
      const result = await adminPannel.findOne({ email: user.Useremail });
      console.log(result);
      if (!result) {
        return res.status(400).send("Email not found");
      }
      const userName = result.name; 
      console.log(userName);
    //   const isMatch = await bcrypt.compare(user.pass, result.pass);
  
      if (result) {
        res.send({ success: true, "name": userName });
      } else {
        res.send("Passwords are not matching");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post('/tenders', async (req, res) => {
    try {
      const { name, description, startTime, endTime, bufferTime } = req.body;
      const newTender = new Tender({name, description, startTime, endTime, bufferTime});
      const result = await newTender.save();
      
      const tenders = await Tender.find();
  
      // Create a bid for each tender
      const bids = await Promise.all(tenders.map(async (tender) => {
        // Check if a bid already exists for the current tender
        const existingBid = await Bid.findOne({ tender: tender._id });
        if (!existingBid) {
          const bid = new Bid({
            tender: tender._id // Reference to the tender ID
          });
          return bid.save();
        }
      }));
      res.status(200).json({ message: 'Bids created successfully', bids, data: result });
      // res.status(201).json({success: true, message: 'Tender created successfully', });
    } catch (error) { 
      console.error(error);
      res.status(500).json({success: false, message: 'An error occurred while creating the tender', error: error.message});
    }
  });
  app.get('/tenders', async (req, res) => {
    try {
      const result = await Tender.find({}); //   .sort({ Ranking: 1 });  is used to sort data on the basis of ranking
      console.log(result);
      res.send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  app.get('/tenders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const tender = await Tender.findById(id);
  
      if (!tender) {
        return res.status(404).send('Tender not found');
      }
  
      res.send(tender);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post('/bids', async (req, res) => {
    try {
      // Fetch all tenders from the database
      const tenders = await Tender.find();
  
      // Create a bid for each tender
      const bids = await Promise.all(tenders.map(async (tender) => {
        // Check if a bid already exists for the current tender
        const existingBid = await Bid.findOne({ tender: tender._id });
        if (!existingBid) {
          const bid = new Bid({
            tender: tender._id // Reference to the tender ID
          });
          return bid.save();
        }
      }));
  
      res.status(200).json({ message: 'Bids created successfully', bids });
    } catch (error) {
      console.error('Error creating bids:', error);
      res.status(500).json({ message: 'Error creating bids', error });
    }
  });

  app.get('/bids', async (req, res) => {
    try {
      const bids = await Bid.find().populate('tender');
      res.json(bids);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  app.get('/bids/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const bids = await Bid.findById(id).populate('tender');
      res.json(bids);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
 const port = process.env.PORT || 8070;
app.listen(port, () => console.log(`Server running at ${port}`));


