const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//Warning: Do not use in production
app.use(cors({
    origin: "*"
}));
app.use(express.json());


const uri = "mongodb+srv://farhan:HQukfW6ZB6Vvwvcy@cluster0.jk4qi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('cleanCo').collection("service");

        app.get('/get-service', async (req, res) => {
            const services = await serviceCollection.find({}).toArray()
            res.send(services)
        });

        app.post("/add-service", async (req, res) => {

            const data = req.body;
            const result = await serviceCollection.insertOne(data);
            res.send(result)

        });

        //Put
        app.put('/update-service/:id', async (req, res) => {
            const { id } = req.params;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: data
            };
            const option = { upsert: true };
            const result = await serviceCollection.updateOne(filter, updateDoc, option)
            res.send(result)
        })
        //Delete
        app.delete('/delete-service/:id', async (req, res) => {
            const { id } = req.params;

            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query)
            res.send(result)
        })
        //With try Catch block
        // try {
        //     const data = req.body;
        //     const result = await serviceCollection.insertOne(data);
        //     res.send({ status: true, result: result })
        // }
        // catch (error) {
        //     res.send({status: false, error})
        // }
    }
    finally {

    }
}
run().catch(console.dir);

//Body
app.get('/dummy-route/user2', async (req, res) => {
    // params ekta object return kore 
    const data = req.body;
    res.send(data)
})



//Query
app.get('/dummy-route/user', async (req, res) => {
    // params ekta object return kore 
    const { name, age } = req.query;
    console.log(name)
    console.log(age)
    res.json({ name, age });
})



//params
app.get('/dummy-route/user/:id', async (req, res) => {
    // params ekta object return kore 
    const { id } = req.params;
    console.log(id)
    res.send(id);
})
app.get('/', async (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Ami doracchi ${port}`);
})

//farhan
//HQukfW6ZB6Vvwvcy