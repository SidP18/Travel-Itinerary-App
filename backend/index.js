const express = require("express");
const bodyParser = require("body-parser");
const elasticClient = require("./elastic-client");
require("express-async-errors");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.redirect("http://localhost:5173/");
});

app.post("/create-user", async (req, res) => {
    const result = await elasticClient.index({
        index: "index",
        id: req.body.email,
        document: {
            name: req.name,
            email: req.email,
            password: req.pass,
            trips: []
        },
    });
    res.send(result);
});

app.post("/add-trip", async (req, res) => {
    const result = await elasticClient.update({
        index: 'index',
        id: auth.email,
        script: {
          lang: 'painless',
          source: 'ctx._source.user.add',
          params: req
        }
      });
    res.send(result);
});

app.delete("/remove-post", async (req, res) => {
    const result = await elasticClient.delete({
        index: "posts",
        id: req.query.id,
    });

    res.json(result);
});

app.get("/search", async (req, res) => {
    const result = await elasticClient.search({
        index: "posts",
        query: { fuzzy: { title: req.query.query } },
    });

    res.json(result);
});

app.get("/posts", async (req, res) => {
    const result = await elasticClient.search({
        index: "posts",
        query: { match_all: {} },
    });

    res.send(result);
});

app.listen(8080);