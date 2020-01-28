const express = require("express");
const router = express.Router();

// Models
const Subscriber = require("../models/Subscriber");

// Get all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Get one
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Create a sub
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribed_to_channel,
    subscribeDate: req.body.subscribe_date
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Update a sub
router.patch("/:id", async (req, res) => {
  // Update the sent fields
  try {
    const updatedSubscriber = await Subscriber.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSubscriber);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Delete a sub
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: `Subscriber was deleted.` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: "Subscriber was not found." });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
