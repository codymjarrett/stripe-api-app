import { useState, useEffect, useContext } from 'react'
import { ShoeCard } from './ShoeCard'

import { useQuery } from '@apollo/react-hooks'
import { SHOES_QUERY } from '../graphql/shoes.query'

// import { AppContext } from '../context'

export const Shoes = () => {
	// const { state, dispatch } = useContext(AppContext)
	const { data, loading, error } = useQuery(SHOES_QUERY)

	useEffect(() => {}, [data, loading, error])

	if (loading) {
		return <p>LOADING...</p>
	}

	if (error) {
		return <p>Error: {JSON.stringify(error)}</p>
	}

	return (
		<div className="mt-4 p-2">
			<h2>MOST POPULAR</h2>
			<div className="flex flex-wrap justify-between mt-4">
				{data.getAllShoes.map(({ id, name, price, image }) => (
					<ShoeCard key={id} id={id} name={name} price={price} image={image} />
				))}
			</div>
		</div>
	)
}
