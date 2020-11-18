const { GraphQLServer, PubSub } = require('graphql-yoga')
const express = require('express')

const typeDefs = `
  type Query {
    hello: String!
  }
  type Counter {
    count: Int!
    countStr: String
  }
  type Subscription {
    counter: Counter!
  }
`

const resolvers = {
    Query: {
        hello: () => `Hello`,
    },
    Counter: {
        countStr: counter => `Current count: ${counter.count}`,
    },
    Subscription: {
        counter: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).substring(2, 15) // random channel name
                let count = 0
                setInterval(() => pubsub.publish(channel, { counter: { count: count++ } }), 200)
                return pubsub.asyncIterator(channel)
            },
        }
    },
}

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.express.use(express.static('public'))
server.start({port: 4444},() => console.log('Server is running on localhost:4444'));