const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcryptjs = require('bcryptjs')


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://b022210085:1234@syamim.lox0su1.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.use(express.json())

app.get('/', (req, res) => {
  {
    client.db("NanoNini").collection("users").insertOne({
      "username": req.body.username,
      "password": req.body.password,
    })
  };
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  const {username,password}=req.body
  console.log(username,password);

  const hash= bcryptjs.hashSync(password,10);
  client.db("NanoNini").collection("users").
  insertOne({"username": req.body.username,"password": hash });
  res.send('Register successfully');
  console.log(hash);
})
  

  //client.db("NanoNini").collection("users").find({
    //"username": { $eq: req.body.username }
  //}).toArray().then((result) => {
    //if (result.length > 0) {
      //res.status(400).send('Username already exists')
    //} else {
      //client.db("NanoNini").collection("users").insertOne({
        //"username": req.body.username,
        //"password": req.body.password,
      //})
      //res.send('Register successfully')
    //}
 // })
//})

app.patch('/profile', (req, res) => {
  client.db("NanoNini").collection("users").updateOne({
    "username": { $eq: req.body.username }}, 
    {
    $set: {
      "email": req.body.email
     },

  }).then(result => {
    res.send('Update successfully')
  })
})

app.post('/login', (req, res) => {
  if (req.body.username !== 'Apip') {
    res.status(400).send('Invalid username')
    return
  }
  if (req.body.password !== 'Apip123') {
    res.status(401).send('Invalid password')
    return
  }
  res.send('login successfully')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
