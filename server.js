const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
}=require('graphql');

const schema=new GraphQLSchema({
  query:new GraphQLObjectType({
    name:"HelloWorld",
    fields:()=>({
      message:{
        type:GraphQLString,
        resolve:()=>"Hello World"
      },
      myName:{
        type:GraphQLString,
        resolve:()=>"My Name is deepak"
      }

    })
  })
})
const app=express();

app.use('/graphql', graphqlHTTP({
  schema:schema,
  graphiql: true,
}));
app.listen(5000,()=>{
})
