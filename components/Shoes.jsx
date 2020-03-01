import { useState, useEffect } from 'react'
import { inventory as data } from '../data/'

export const Shoes = () => {
	const [inventory, setInventory] = useState(data)
	return (
		<div className="mt-4 p-2">
			<h2>MEN</h2>
			<div className="flex justify-between flex-wrap">
				{data.mens.shoes.map(({ id, name, price, image }) => (
					<div className="w-40 cursor-pointer" key={id}>
						<img
							className="border-solid border-2 border-gray-200"
							src={image}
							alt=""
							srcset=""
						/>
						<div className="bg-gray-200 p-2">
							<p className="">{name}</p>
							<strong className="block text-center mt-2">${price}</strong>
						</div>
					</div>
				))}
			</div>
			<h2>WOMEN</h2>
			<div className="flex justify-between flex-wrap">
				{data.women.shoes.map(({ id, name, price, image }) => (
					<div className="w-40 cursor-pointer" key={id}>
						<img
							className="border-solid border-2 border-gray-200"
							src={image}
							alt=""
							srcset=""
						/>
						<div className="bg-gray-200 p-2">
							<p className="">{name}</p>
							<strong className="block text-center mt-2">${price}</strong>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
