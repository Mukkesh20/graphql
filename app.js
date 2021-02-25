const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/assetDataSchema');
const app = express();
var cors = require("cors");

mongoose.connect('mongodb://127.0.0.1:27017/node-graphql?gssapiServiceName=mongodb')
mongoose.connection.once('open', ()=>{
    console.log('Connection Successful')
})

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

 
app.listen(3000, ()=>{
    console.log('server running at 3000')
})