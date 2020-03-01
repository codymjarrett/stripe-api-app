import Head from 'next/head'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Shoes } from '../components/Shoes'

import '../styles/index.css'

const Home = () => (
	<>
		<Header />
		<Hero />
		<Shoes />

	</>
)

export default Home
