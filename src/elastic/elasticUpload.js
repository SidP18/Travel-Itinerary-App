import React from "react"
import { Client } from '@elastic/elasticsearch'


const client = new Client({
  cloud: { id: 'TravelAdvisor:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ1YmViNDJkY2IyNzE0Yjc5ODJjYjE2ZmI3ZmQ3NzlmOCRmNTQzOTU3M2IzMTY0ZGIyOWU1NmFkMWFlODZjMGZhMQ==' },
  auth: { apiKey: 'V0R1dVhZY0JGWnpraUxySEFadWE6NmVVUzF4R0NTc2FRNTEyek1TQjE0QQ==' }
})

export const es_uploadUser = async (auth) => {
  var auth_temp = auth
  auth_temp.trips = []
  const response = await client.index({
    index: 'index',
    id: auth.email,
    document: auth
  })
  console.log(response)
}

export const es_addTrip = async (auth, trip) => {
  const response = await client.update({
    index: 'index',
    id: auth.email,
    script: {
      lang: 'painless',
      source: 'ctx._source.user.add',
      params: trip
    }
  })
  console.log(response)
}

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