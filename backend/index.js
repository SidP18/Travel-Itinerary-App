import express from "express";
import cors from 'cors'
import { Client } from '@elastic/elasticsearch'
import bodyParser from 'body-parser'
const app = express();

app.use(cors(), express.json({limit: '100mb'}));

const client = new Client({
    cloud: { id: 'TravelAdvisor:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ1YmViNDJkY2IyNzE0Yjc5ODJjYjE2ZmI3ZmQ3NzlmOCRmNTQzOTU3M2IzMTY0ZGIyOWU1NmFkMWFlODZjMGZhMQ==' },
    auth: { apiKey: 'TUNVb200Y0JpZmZGZTg3ekY2QzA6ZmV6SnZTTlRUSEtNOTdKYnpnaTBKZw==' }
})

// const createIndex = async (indexName) => {
//     await elasticClient.indices.create({ index: indexName });
//     console.log("Index created");
// };

// createIndex("index");

app.get("/", (req, res) => {
    res.redirect("http://localhost:3000/");
});

app.post("/create-user", async (req, res) => {
    const result = await client.index({
        index: "test_index",
        id: req.body.email,
        document: {
            name: req.name,
            email: req.email,
            password: req.pass,
            trips: []
        },
    });
    console.log(result)
    res.send("Added User: " + req.body.email);
});

app.post("/add-trip", async (req, res) => {
    const result = await client.update({
        index: 'test_index',
        id: req.body.id,
        script: {
            lang: 'painless',
            source: "ctx._source.trips.add(params.object)",
            params: {
                object: [req.body.trip]
            }
        }
    });
    console.log(result)
    res.send("Added Trip: " + req.body.trip.Location);
});

app.post("/user-search", async (req, res) => {
    const result = await client.search({
        index: "test_index",
        query: { match: { "_id": req.body.email } },
    });
    console.log(result)
    res.send(result.hits);
});

app.delete("/remove-post", async (req, res) => {
    const result = await client.delete({
        index: "posts",
        id: req.query.id,
    });

    res.json(result);
});

app.get("/posts", async (req, res) => {
    const result = await client.search({
        index: "posts",
        query: { match_all: {} },
    });

    res.send(result);
});

app.listen(8080, () => console.log("App is running"));