const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')

require('./config')

const { Shoe, Inventory } = require('./models')
const typeDefs = gql`
	type Shoe {
		id: ID!
		name: String!
		price: Int!
		image: String!
		gender: Gender!
		inventory: [Inventory!]!
	}

	# input ShoeInput {
	# 	name: String!
	# 	price: Int!
	# 	image: String!
	# 	inventory: InventoryInput!
	# }

	type Inventory {
		id: ID!
		size: String!
		gender: Gender!
		quantity: Int!
	}

	input InventoryInput {
		size: String!
		gender: Gender!
		quantity: Int!
	}

	input UpdateInventoryInput {
		id: ID!
		inventory: InventoryInput!
	}

	enum Gender {
		WOMEN
		MEN
		UNISEX
	}

	type Query {
		getAllShoes: [Shoe!]!
		# shoe(id: ID!): Shoe
	}

	type Mutation {
		addNewShoe(
			name: String!
			price: Int!
			image: String!
			gender: Gender!
			inventory: [InventoryInput!]!
		): Shoe
		addNewInventoryToShoe(input: UpdateInventoryInput!): Shoe
	}
`

const resolvers = {
	Query: {
		getAllShoes: async () => await Shoe.find({}).exec(),
	},
	Mutation: {
		addNewShoe: async (_, args) => {
			try {
				let response = await Shoe.create(args)
				return response
			} catch (e) {
				return e.message
			}
		},
		addNewInventoryToShoe: async (_, args) => {
			try {
				let response = await Shoe.findByIdAndUpdate(
					{ _id: args.input.id },
					{ $push: { inventory: args.input.inventory } },
					{ upsert: true, new: true }
					// ! ADDING A CALLBACK HERE WILL TRIGGER DUPLICATE ENTRIES
				)
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
app.use(cors())

app.listen({ port: 4000 }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})

// const app = express()

// app.use(express.json())
// app.use(cors())
