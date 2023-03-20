// Import required packages
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

// Create a new Express app
const app = express();

// Set up a MongoDB connection
const uri = 'mongodb+srv://LilithC:WhiteRabbit69@cluster0.oj49duw.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// Wrap server startup in client.connect() callback
client.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB Atlas');

    // Set up a route to handle POST requests to /findOne
    app.post('/findOne', (req, res) => {
      // Get request body from the POST request
      const { database, collection, filter, projection } = req.body;

      // Validate request body
      if (!database || !collection || !filter) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
      }
      
      // Validate projection
      if (projection && typeof projection !== 'object') {
        res.status(400).json({ message: 'Invalid projection parameter' });
        return;
      }

      // Find a single document that matches the query parameters
      const db = client.db(database);
      const coll = db.collection(collection);
      coll.findOne(filter, { projection }, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        } else if (result) {
          // If a matching document is found, return it
          res.json(result);
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
