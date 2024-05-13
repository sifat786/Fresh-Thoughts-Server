const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//* Middleware:
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://fresh-thoughts-12a68.web.app'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());


// ///TODO: MondoDB:

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zzvfjhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const blogCollection = client.db("freshThoughts").collection("blogs");
    const commentCollection = client.db("freshThoughts").collection("comments");

    //** blog related api **/
    //! GET
    app.get('/blogs', async(req, res) => {
        const result = await blogCollection.find().toArray();
        res.send(result);
    })

    app.get('/blogs/:id', async(req, res) => {
        const query = { _id: new ObjectId(req.params.id) };
        const result = await blogCollection.findOne(query);
        res.send(result);
    })

    //** comment related api **/
    //! GET
    app.get('/comments', async(req, res) => {
      const result = await commentCollection.find().toArray();
      res.send(result);
    })

    app.get('/comments/:blogId', async(req, res) => {
      const query = { blogId: req.params.blogId };
      const result = await commentCollection.find(query).toArray();
      res.send(result);
    });
    

    //! POST
    app.post('/comments', async(req, res) => {
      const result = await commentCollection.insertOne(req.body);
      res.send(result);
    })





    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.use('/', (req, res) => {
    res.send('blog is running');
})

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
})