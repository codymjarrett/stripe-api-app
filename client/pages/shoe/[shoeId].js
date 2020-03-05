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

const ShoeId = () => {
	const [buttonError, setButtonError] = useState(false)
	const { state, dispatch } = useContext(AppContext)
	const router = useRouter()
	const { shoeId } = router.query
	const { data, loading, error } = useQuery(SHOE_QUERY, {
		variables: { shoeId },
	})

	const handleSelectOnChange = e => {
		selectShoeGender(dispatch, e.target.value)
	}
	const handleShoeSizeClick = (name, id, sizeId, gender, size) => {
		dispatch({
			type: SET_SHOE_SIZE_TO_STATE,
			payload: {
				shoe: name,
				id,
				selectedSize: {
					id: sizeId,
					gender,
					size,
				},
			},
		})
	}

	const handleAddToCart = () => {
		if (Object.keys(state.selectedShoe).length === 0) {
			setButtonError(true)
		} else {
			dispatch({
				type: ADD_ITEMS_TO_CART,
				payload: state.selectedShoe,
			})
			// reset the shoe size state to empty object 
			dispatch({
				type: SET_SHOE_SIZE_TO_STATE,
				payload: {},
			})
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
		gender,
	} = data.getOneShoe
	return (
		<div className="p-4">
			<div>
				<img src={image} alt="" />
			</div>
			<p className="font-bold text-center text-xl">{name}</p>
			<p className="font-medium text-center text-4xl">${price}</p>
			<div>
				<div className="flex justify-around">
					<p>Select Size</p>
					<select className="w-32" onChange={handleSelectOnChange}>
						{renderAppropriateOptions(gender)}
					</select>
				</div>
				<div
					className={`grid grid-cols-4 gap-4 mt-4 ${
						buttonError ? 'border-solid border border-red-600 rounded-md' : null
					}`}
				>
					{inventory
						.filter(s => s.gender === state.genderSelection)
						.map(({ size: shoeSize, quantity, id: sizeId, gender }) => (
							<button
								key={sizeId}
								onClick={() =>
									handleShoeSizeClick(
										name,
										currentShoeID,
										sizeId,
										gender,
										shoeSize
									)
								}
								className="block border-solid border-2 border-gray-400 hover:bg-gray-500 hover:text-white rounded-md py-4"
							>
								{shoeSize}
							</button>
						))}
				</div>
				<div className="flex justify-center mt-4">
					<button
						className="bg-gray-900 hover:bg-gray-800 text-white w-full py-6 rounded-md"
						onClick={handleAddToCart}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	)
}
export default ShoeId
