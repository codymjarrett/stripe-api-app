import Head from 'next/head'
import { useContext } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Shoes } from '../components/Shoes'

import AppProvider from '../context'

import '../styles/index.css'

const Home = () => {
	return (
		<AppProvider>
			<Header />
			<Hero />
			<Shoes />
		</AppProvider>
	)
}

export default Home
