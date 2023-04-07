/*const es = require('@elastic/elasticsearch');
const es_hosts = [
  'https://test-12ded2.es.us-central1.gcp.cloud.es.io'
];
const es_client = new es.Client({ node: es_hosts });
const es_bulk = es_client.child({
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json'
  }
})

async function run() {}
const bulk_data = [
    { index: { _index: 'locations' } },
    { id: "ChIJW9_QXt8VkFQRjxIfTNLIlPc", name: "Denny Lodge", position: {
        lat: 47.6237776,
        lng: -122.335088
    },
    url: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    formatted_address: "501 Fairview Ave N, Seattle, WA 98109",
    business_status: "OPERATIONAL",
    rating: 4.5
    }
  ]
  
  let bulk_body = {
    body: bulk_data.map(JSON.stringify).join('\n') + '\n'
  }
  
  const results = await es_bulk.bulk(bulk_body);*/
  'use strict'

require('array.prototype.flatmap').shim()
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: 'TravelAdvisor:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ1YmViNDJkY2IyNzE0Yjc5ODJjYjE2ZmI3ZmQ3NzlmOCRmNTQzOTU3M2IzMTY0ZGIyOWU1NmFkMWFlODZjMGZhMQ==' },
  auth: { apiKey: 'V0R1dVhZY0JGWnpraUxySEFadWE6NmVVUzF4R0NTc2FRNTEyek1TQjE0QQ==' }
})

async function run () {
  
  const dataset = []

  const operations = dataset.flatMap(doc => [{ index: { _index: 'location' } }, doc]) //change the _index name to fit where we need to send the data

  const bulkResponse = await client.bulk({ refresh: true, operations })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: operations[i * 2],
          document: operations[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const count = await client.count({ index: 'location' }) // here too
  console.log(count)
}

run().catch(console.log)