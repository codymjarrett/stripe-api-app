import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import AppProvider from '../util/context'

import withData from '../util/apollo-client'
import { Layout } from '../components/Layout'

import '../styles/index.css'

const MyApp = ({ Component, pageProps, apollo }) => (
	<ApolloProvider client={apollo}>
		<AppProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppProvider>
	</ApolloProvider>
)

// Wraps all components in the tree with the data provider
export default withData(MyApp)
