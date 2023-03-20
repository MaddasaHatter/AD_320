const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

// Set up a MongoDB connection
const uri = 'mongodb+srv://LilithC:WhiteRabbit69@cluster0.oj49duw.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Wrap server startup in client.connect() callback
client.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB Atlas');

    // Set up a route to handle GET requests to /findOne
    app.get('/findOne', (req, res) => {
      // Get query parameters from the request URL
      const property_type = req.query.property_type;
      const bedrooms = parseInt(req.query.bedrooms);
      const beds = parseInt(req.query.beds);

      // Validate query parameters
      if (!property_type || isNaN(bedrooms) || isNaN(beds)) {
        res.status(400).json({ message: 'Invalid query parameters' });
        return;
      }

      // Find a single document that matches the query parameters
      const collection = client.db('sample_airbnb').collection('listingsAndReviews');
      collection.findOne({ property_type, bedrooms, beds }, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        } else if (result) {
          // If a matching document is found, return it
          const { _id, listing_url, name, summary, property_type, bedrooms, beds } = result;
          res.json({ _id, listing_url, name, summary, property_type, bedrooms, beds });
        } else {
          // If no matching document is found, return a 404 error
          res.status(404).json({ message: 'Document not found' });
        }
      });
    });

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
