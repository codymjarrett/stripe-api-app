import Head from 'next/head'
import { useContext } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Shoes } from '../components/Shoes'



// import { ApolloProvider } from 'react-apollo'
// import { ApolloClient } from 'apollo-client'
// import { createHttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

// const httpLink = createHttpLink({
// 	uri: 'http://localhost:4000',
// })

// const client = new ApolloClient({
// 	link: httpLink,
// 	cache: new InMemoryCache(),
// })

import AppProvider from '../context'

import '../styles/index.css'

const Home = () => {
	return (
		// <ApolloProvider client={client}>
			<AppProvider>
				<Header />
				<Hero />
				<Shoes />
			</AppProvider>
		// </ApolloProvider>
	)
}

export default Home
