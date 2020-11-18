# GraphiQL with websockets support

```
npm install
npm run dev
```

Visit `http://localhost:4444/graphiql.html`

## Change GraphiQL target

Simply change the url in `public/graphiql.html` on line 55 where this code is located:
```
let subscriptionsClient = new window.SubscriptionsTransportWs.SubscriptionClient('ws://tyk-gateway:8181/mycomposed/', {
```

## Tyk
To make it work with Tyk create a UDG API (name it `mycomposed` for convenience) and configure a Query to httpbin - for example:

You can take this schema:
```graphqls
type HttpBin {
  origin: String
}

type Mutation {
  default: String
}

type Query {
  httpBin: HttpBin
}
```

With a REST datasource on: `Query.httpbin` to `GET http://httpbin.org/get`