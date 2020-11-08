const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
}=require('graphql');
const books=[
  {
    id:1,
    title: "Unlocking Android",
    isbn: "1933988673",
    pageCount: 416,
    publishedDate: { "$date": "2009-04-01T00:00:00.000-0700" },
    authors: ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
       categories: ["Open Source", "Mobile"]
  },
  {
    title: "Android in Action, Second Edition",
    isbn: "1935182722",
    pageCount: 592,
    publishedDate: { "$date": "2011-01-14T00:00:00.000-0800" },
    authors: ["W. Frank Ableson", "Robi Sen"],
       categories: ["Java"]
  },
  {
    title: "Specification by Example",
    isbn: "1617290084",
    pageCount: 0,
    publishedDate: { "$date": "2011-06-03T00:00:00.000-0700" },
    authors: ["Gojko Adzic"],
       categories: ["Software Engineering"]
  },
  {
    title: "Flex 3 in Action",
    isbn: "1933988746",
    pageCount: 576,
    publishedDate: { "$date": "2009-02-02T00:00:00.000-0800" },
    authors: ["Tariq Ahmed with Jon Hirschi", "Faisal Abid"],
       categories: ["Internet"]
  }]
const BookType=new GraphQLObjectType({
  name:"Book",
  description:"This is represent a book by a author",
  fields:()=>({
    id:{type:GraphQLNonNull(GraphQLInt)},
    name:{type :GraphQLNonNull(GraphQLString)},
    authorId:{type :GraphQLNonNull(GraphQLInt)},
  })
})
const rootQueryTYpe=new GraphQLObjectType({
  name:"Query",
  description:"Root Query",
  fields:()=>({
    books:{
      type: GraphQLList(BookType),
      description:"List of books",
      resolve:()=>books
    }
  })
})

const schema=new GraphQLSchema({
  query:rootQueryTYpe
})
const app=express();

app.use('/graphql', graphqlHTTP({
  schema:schema,
  graphiql: true,
}));
app.listen(5000,()=>{
})
