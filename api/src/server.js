const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	# This "Book" type defines the queryable fields for every book in our data source.
	type Book {
		id: ID!
		title: String
		author: String
		pagesRead: Int
	}
	type DeleteMessage {
		id: ID!
		message: String
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		books: [Book]
	}
	type Mutation {
		addBook(author: String!, title: String!): Book
		deleteAll: DeleteMessage
		updateProgress(id: String!, progress: Int!): Book
	}
`;

let books = [
	{
		id: 0,
		title: "The Awakening",
		author: "Kate Chopin",
		pagesRead: 25,
	},
	{
		id: 1,
		title: "City of Glass",
		author: "Paul Auster",
		pagesRead: 2425,
	},
];

let nextId = 2;
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		books: () => books,
	},
	Mutation: {
		addBook: (parent, args, context, info) => {
			let newBook = {
				id: nextId++,
				title: args.title,
				pagesRead: 0,
				author: args.author,
			};
			books.push(newBook);
			return newBook;
		},
		updateProgress: (parent, args, context, info) => {
      console.log(args)
			for (let i = 0; i < books.length; i ++){
        if (books[i].id == args.id) { //== because id is in number and args.id in string
          books[i].pagesRead += args.progress
          return books[i]
        }
      }
		},
		deleteAll: () => {
			books = [];
			return {
				id: nextId++,
				message: `All books deleted at ${new Date()}`,
			};
		},
	},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
