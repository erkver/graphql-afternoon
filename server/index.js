const { GraphQLServer } = require("graphql-yoga");
const { readFileSync } = require('fs');

const typeDefs = readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8');
const resolvers = require('./schema/resolvers');

const options = {
  port: 3001,
  endpoint: '/graphql',
  playground: '/graphiql' 
}

const server = new GraphQLServer({
  typeDefs,
  resolvers, 
  context: req => ({
    ...req.request
  })
});

server.start(options, () => console.log(`Listening on port ${options.port}`));