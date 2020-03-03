const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
var colors = require('colors/safe')

require('./config')

const { Shoe, Inventory } = require('./models')
//  change
const typeDefs = gql`
	type Shoe {
		id: ID!
		name: String!
		price: Int!
		image: String!
		# stock: [Inventory!]!
	}

	# input ShoeInput {
	# 	name: String!
	# 	price: Int!
	# 	image: String!
	# 	# stock: [InventoryInput!]!
	# }

	# type Inventory {
	# 	id: ID!
	# 	size: String!
	# 	gender: Gender!
	# 	quantity: Int!
	# }

	# input InventoryInput {
	# 	size: String!
	# 	gender: Gender!
	# 	quantity: Int!
	# }

	enum Gender {
		WOMEN
		MEN
	}

	type Query {
		getAllShoes: [Shoe!]!
		# shoe(id: ID!): Shoe
	}

	type Mutation {
		# addNewShoe(input: ShoeInput): Shoe
		addNewShoe(name: String!, price: Int!, image: String!): Shoe
	}
`

const resolvers = {
	Query: {
		getAllShoes: async () => await Shoe.find({}).exec(),
	},
	Mutation: {
		addNewShoe: async (_, args) => {
			try {
				console.log('args', args)
				let response = await Shoe.create(args)
				console.log('response', response)
				return response
			} catch (e) {
				return e.message
			}
		},
	},
}

// 3
const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })
// app.use(cors())

app.listen({ port: 4000 }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})

// const app = express()

// app.use(express.json())
// app.use(cors())
