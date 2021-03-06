import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { SHOE_QUERY } from '../../graphql/shoe.query'
import { AppContext } from '../../util/context'
import {
	SELECT_SHOE_GENDER,
	SET_SHOE_SIZE_TO_STATE,
	ADD_ITEMS_TO_CART,
} from '../../util/constants'
import { selectShoeGender } from '../../util/actions'

import { Button } from '../../components/Button'

export default function ShoeId() {
	const [buttonError, setButtonError] = useState(false)
	const [activeButton, setActiveButton] = useState(null)
	const { state, dispatch } = useContext(AppContext)
	const router = useRouter()
	const { shoeId } = router.query
	const { data, loading, error } = useQuery(SHOE_QUERY, {
		variables: { shoeId },
	})

	const handleSelectOnChange = e => {
		selectShoeGender(dispatch, e.target.value)
	}
	const handleShoeSizeClick = (
		name,
		image,
		price,
		shoeGender,
		id,
		inventory,
		sizeId,
		sizeGender,
		size,
		index
	) => {
		setActiveButton(index)
		dispatch({
			type: SET_SHOE_SIZE_TO_STATE,
			payload: {
				shoe: name,
				image,
				price,
				id,
				shoeGender,
				inventory,
				selectedSize: {
					id: sizeId,
					sizeGender,
					size,
					quantity: 1,
				},
			},
		})
	}

	const addToCart = () => {
		// * check whether the selected shoe object is 'empty' before allowing click to add to cart
		if (Object.keys(state.selectedShoe).length === 0) {
			// * if so, set error state
			setButtonError(true)
		} else {
			// * reset the active button index to null when add to cart clicked
			setActiveButton(null)
			dispatch({
				type: ADD_ITEMS_TO_CART,
				payload: state.selectedShoe,
			})
			// * reset the shoe size state to empty object
			dispatch({
				type: SET_SHOE_SIZE_TO_STATE,
				payload: {},
			})
			// * get rid of the error state
			setButtonError(false)
		}
	}

	const renderAppropriateOptions = gender => {
		if (gender === 'UNISEX') {
			return (
				<>
					<option value="MEN">MEN</option>
					<option value="WOMEN">WOMEN</option>
				</>
			)
		} else if (gender === 'MEN') {
			return (
				<>
					<option value="MEN">MEN</option>
				</>
			)
		} else if (gender === 'WOMEN') {
			return (
				<>
					<option value="WOMEN">WOMEN</option>
				</>
			)
		}
	}

	useEffect(() => {
		if (data) {
			if (data.getOneShoe.gender === 'UNISEX') {
				selectShoeGender(dispatch, 'MEN')
			} else if (data.getOneShoe.gender === 'MEN') {
				selectShoeGender(dispatch, 'MEN')
			} else if (data.getOneShoe.gender === 'WOMEN') {
				selectShoeGender(dispatch, 'WOMEN')
			}
		}
	}, [data, loading, error])

	if (loading) {
		return <p>LOADING...</p>
	}

	if (error) {
		return <p>Error: {JSON.stringify(error)}</p>
	}
	const {
		id: currentShoeID,
		name,
		image,
		price,
		inventory,
		gender: shoeGender,
	} = data.getOneShoe
	return (
		<div className="p-4">
			<div>
				<img src={image} alt={name} />
			</div>
			<p className="font-bold text-center text-xl">{name}</p>
			<p className="font-medium text-center text-4xl">${price}</p>
			<div>
				<div className="flex justify-around mt-4">
					<p>Select Size</p>
					<select className="w-32" onChange={handleSelectOnChange}>
						{renderAppropriateOptions(shoeGender)}
					</select>
				</div>
				<div
					className={`grid grid-cols-4 gap-4 mt-4 ${
						buttonError ? 'border-solid border border-red-600 rounded-md' : null
					}`}
				>
					{inventory
						.filter(s => s.gender === state.genderSelection)
						.sort((a, b) => a.size - b.size)
						.map(
							({ size: shoeSize, id: sizeId, gender: sizeGender }, index) => (
								<button
									key={sizeId}
									onClick={() =>
										handleShoeSizeClick(
											name,
											image,
											price,
											shoeGender,
											currentShoeID,
											inventory,
											sizeId,
											sizeGender,
											shoeSize,
											index
										)
									}
									className={`block border-solid border-2 border-gray-400 hover:border-black rounded-md py-4 ${
										index === activeButton ? 'bg-black text-white' : null
									}`}
								>
									{shoeSize}
								</button>
							)
						)}
				</div>
				{buttonError ? (
					<div className="text-red-600 text-center mt-4">
						Please select a size!
					</div>
				) : null}
				<div className="flex justify-center mt-4">
					<Button handleButtonClick={addToCart} text="ADD TO CART" large={true}/>
				</div>
			</div>
		</div>
	)
}
