const path = require('path')
const express = require('express');
//const {buildSchema} = require('graphql');
// const {graphqlHTTP} = require('express-graphql');
const {ApolloServer} = require('apollo-server-express')
const {loadFilesSync} = require('@graphql-tools/load-files')
const {makeExecutableSchema} = require('@graphql-tools/schema')

const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql'],
  });

  const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer(){
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray,
        // resolvers:{
        //     Query:{
        //         products: async (parent)=>{
        //             console.log('Getting the products...');
        //             const product = await Promise.resolve(parent.products);
        //             return product;
        //         },
        //         orders: (parent)=>{
        //             console.log('Getting orders...');
        //             return parent.orders;
        //         },
        //     }
        // }
    })
   const server = new ApolloServer({
    schema,
   });
   await server.start();
   server.applyMiddleware({app, path: '/graphql'})

   app.listen(3000, ()=>{
    console.log("Running GraphQL server...")
})
}

startApolloServer();
// const root={
// products: require('./products/products.model'),
// orders: require('./orders/orders.model')
// };

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
   
//     graphiql:true,
// }))

