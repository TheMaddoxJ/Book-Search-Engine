const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me(id: ID!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: userSaveBook): User
    removeBook(bookId: String!): User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: String
    user: User
}

input userSaveBook {
    bookId: String!
    authors: [String] 
    description: String 
    title: String! 
    image: String
    link: String
}
`;

module.exports = typeDefs;