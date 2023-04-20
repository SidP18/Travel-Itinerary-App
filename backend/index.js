import express from "express";
import cors from 'cors'
import { Client } from '@elastic/elasticsearch'
import bodyParser from 'body-parser'
const app = express();

app.use(cors(), express.json({ limit: '100mb' }));

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
        index: "test_index2",
        id: req.body.email,
        document: {
            "name": req.name,
            "email": req.email,
            "password": req.pass,
            "trips": []
        },
    });
    console.log(result)
    res.send("Added User: " + req.body.email);
});

app.post("/add-trip", async (req, res) => {
    const result = await client.update({
        index: 'test_index2',
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

var get = {
    "query": {
        "nested": {
            "path": "trips",
            "query": {
                "nested": {
                    "path": "trips.Restaurants",
                    "query": {
                        "bool": {
                            "must": [
                                { "match": { "trips.Restaurants.rating": "3.5" } }
                            ]
                        }
                    }

                }
            }
        }
    },
    "fields": [
        "trips.Restaurants.name", "trips.Restaurants.rating"
    ],
    "_source": false
}

app.post("/user-search", async (req, res) => {
    const result = await client.search({
        index: "test_index2",
        query: { match: { "_id": req.body.email } },
    });
    console.log(result)
    res.send(result.hits);
});

app.post("/filter-rest", async (req, res) => {

    const result = await client.search({
        index: 'test_index2',
        _source: false,
        body: {
          query: {
            bool: {
              must: [
                {
                  term: {
                    _id: {
                      value: "bouie@osu.edu"
                    }
                  }
                },
                {
                  nested: {
                    path: 'trips',
                    query: {
                      bool: {
                        must: [
                          {
                            term: {
                              'trips.Trip_id': {
                                value: 1
                              }
                            }
                          },
                          {
                            nested: {
                              path: 'trips.Restaurants',
                              query: {
                                bool: {
                                  must: [
                                    {
                                      range: {
                                        'trips.Restaurants.rating': {
                                          gte: 3.5,
                                          lte: 4.5
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          },
          fields: [
            'trips.Restaurants.name',
            'trips.Restaurants.rating',
            'trips.Restaurants.address',
            'trips.Restaurants.cuisine',
            'trips.Restaurants.description',
            'trips.Restaurants.dietary_restriction',
            'trips.Restaurants.phone_number',
            'trips.Restaurants.website',
            'trips.Restaurants.photo'
          ]
        }
      });

    console.log(result);
    res.send(result);
});

app.post("/filter-att", async (req, res) => {
    const result = await client.search({
        index: 'test_index2',
        _source: false,
        body: {
          query: {
            bool: {
              must: [
                {
                  term: {
                    _id: {
                      value: "bouie@osu.edu"
                    }
                  }
                },
                {
                  nested: {
                    path: 'trips',
                    query: {
                      bool: {
                        must: [
                          {
                            term: {
                              'trips.Trip_id': {
                                value: 1
                              }
                            }
                          },
                          {
                            nested: {
                              path: 'trips.Attractions',
                              query: {
                                bool: {
                                  must: [
                                    {
                                      range: {
                                        'trips.Attractions.rating': {
                                          gte: 3.5,
                                          lte: 4.5
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          },
          fields: [
            "trips.Attractions.name", "trips.Attractions.address", "trips.Attractions.description",
            "trips.Attractions.phone_number", "trips.Attractions.subcategory", "trips.Attractions.website", "trips.Attractions.photo", "trips.Attractions.rating"
        ]
        }
      });

    console.log(result);
    res.send(result);
});

// Attractions: Address, Description, Hours, Phone number, photo, Rating, Subcategory, Website

app.post("/filter-event", async (req, res) => {
    const result = await client.search({
        index: 'test_index2',
        _source: false,
        body: {
          query: {
            bool: {
              must: [
                {
                  term: {
                    _id: {
                      value: "bouie@osu.edu"
                    }
                  }
                },
                {
                  nested: {
                    path: 'trips',
                    query: {
                      bool: {
                        must: [
                          {
                            term: {
                              'trips.Trip_id': {
                                value: 1
                              }
                            }
                          },
                          {
                            nested: {
                              path: 'trips.Events',
                              query: {
                                bool: {
                                  must: [
                                    {
                                      range: {
                                        'trips.Events.priceRanges[0].min': {
                                          gte: 10,
                                          lte: 60
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          },
            fields: [
                "trips.Events.name", "trips.Events.images", "trips.Events.dates", "trips.Events.priceRanges", "trips.Events.URL",
            ],
        }
    });

    console.log(result);
    res.send(result);
});

// Restaurants: Address, Cuisine, Description, Dietary Restriction, ~Hours, Phone number, Website, Photo, Rating, Price range
// Attractions: Address, Description, Hours, Phone number, photo, Rating, Subcategory, Website
// Events: Name, Images, Dates, Price Range, URL

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