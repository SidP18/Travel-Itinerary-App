import { Client } from '@elastic/elasticsearch'

const client = new Client({
  cloud: { id: 'TravelAdvisor:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ1YmViNDJkY2IyNzE0Yjc5ODJjYjE2ZmI3ZmQ3NzlmOCRmNTQzOTU3M2IzMTY0ZGIyOWU1NmFkMWFlODZjMGZhMQ==' },
  auth: { apiKey: 'V0R1dVhZY0JGWnpraUxySEFadWE6NmVVUzF4R0NTc2FRNTEyek1TQjE0QQ==' }
})

module.exports = client;