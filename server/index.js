const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { ObjectId } = require('mongodb');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { connectToDatabase } = require('./database');
const jwt = require('jsonwebtoken');
const { get } = require('mongoose');


//middleware
app.use(express.json())
app.use(cors())            // ss -->domain  and  sf-->domain2

// username: sunkarisahith03
// password: mEX0vuRNSE062nEQ

async function run() {
  try {
    const { recruitersCollection, seekersCollection, jobsCollections } = await connectToDatabase();

    // Routes for signup and login
    app.use('/api/users', (req, res, next) => {
      // Pass the recruiters and seekers collections to the user routes
      userRoutes(req, res, next, recruitersCollection, seekersCollection);
    });
    app.use('/api/auth', authRoutes);

    // after posting a job
    app.post("/post-job", async(req, res)=>{
        const body = req.body;
        body.createAt = new Date();
        // console.log(body)
        const result = await jobsCollections.insertOne(body);
        if (result.insertedId) {
            return res.status(200).send(result);
        }else{
            return res.status(404).send({
                message:"cannot insert try again later!",
                status: false
            })
        }
    })

    // importing all jobs
    app.get("/all-jobs", async(req, res)=>{
        const jobs = await jobsCollections.find({}).toArray()
        res.send(jobs)
    })

    // importing single job.
    app.get("/all-jobs/:id", async(req,res)=>{
      const id = req.params.id;
      const job = await jobsCollections.findOne({
        _id:new ObjectId(id)
      })
      res.send(job)
    } )


    // importing jobs by email.
    app.get("/myJobs/:email", async(req, res)=>{
        // console.log(req.params.email)
        const jobs = await jobsCollections.find({postedBy : req.params.email}).toArray();
        res.send(jobs);
    })

      // deleting a job

        app.delete("/job/:id", async (req, res) => {
          const id = req.params.id;
          const filter = { _id: new ObjectId(id) };
        
          try {
            const result = await jobsCollections.deleteOne(filter);
            res.send(result);
          } catch (error) {
            console.error('Error deleting job:', error);
            res.status(500).send({
              message: "Internal server error",
              status: false
            });
          }
        });
        
        // Editing Jobs

        app.patch("/edit-job/:id", async(req,res)=>{
            const id = req.params.id;
            const jobData = req.body;
            const filter = {_id: new ObjectId(id)};
            const options = {upsert:true}
            const updateDoc= {
              $set:{
                  ...jobData
              },
            }

            const result = await jobsCollections.updateOne(filter,updateDoc,options);
            res.send(result)
        })

        const token = (req,res,next)=>{
          const getToken = req.headers['authorization'];
          // res.send(getToken)
          console.log(getToken)
          if (!getToken) {
            return res.status(401).json({error: 'Invalid or missing Authorization'})
          }

          const reqToken = getToken.split(' ')[1];
         // console.log(reqToken)
          try {
            const user = jwt.verify(reqToken,process.env.JWTPRIVATEKEY);
            console.log(user);
            req.user = user;
            next();
          } catch (err) {
            return res.status(401).json({error:'invalid'});
          }
        }
        
        app.get('/user', token, async(req,res)=>{
          try{
            const find = req.user._id;
            console.log(find)

            const user = await db.recruitersCollection('Seekers').findOne({role:find});
            console.log(user);
            res.send(user);
            
            if(!user){
              return res.status(401).json({error:'invalid 2'});
            }
          }catch{
            return res.status(401).json({error:'gone wrong in end point.'})
          }
        })

        // Send a ping to confirm a successful connection
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Dev!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

