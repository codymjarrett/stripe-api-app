import { useState, useEffect, useContext } from 'react'
import { ShoeCard } from './ShoeCard'

import { AppContext } from '../context'

export const Shoes = () => {
	const { state, dispatch } = useContext(AppContext)
	useEffect(() => {}, [state])
	return (
		<div className="mt-4 p-2">
			<h2>MEN</h2>
			<div className="flex justify-between flex-wrap">
				{state.mens.shoes.map(({ id, name, price, image }) => (
					<ShoeCard key={id} name={name} price={price} image={image} />
				))}
			</div>
			<h2>WOMEN</h2>
			<div className="flex justify-between flex-wrap">
				{state.women.shoes.map(({ id, name, price, image }) => (
					<ShoeCard key={id} name={name} price={price} image={image} />
				))}
			</div>
		</div>
	)
}
