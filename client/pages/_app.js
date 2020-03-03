import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import AppProvider from '../util/context'

import withData from '../util/apollo-client'

class MyApp extends App {
	render() {
		const { Component, pageProps, apollo } = this.props
		return (
			<ApolloProvider client={apollo}>
				<AppProvider>
					<Component {...pageProps} />
				</AppProvider>
			</ApolloProvider>
		)
	}
}

// Wraps all components in the tree with the data provider
export default withData(MyApp)
