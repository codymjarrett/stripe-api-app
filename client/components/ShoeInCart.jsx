import { useContext } from 'react'
import { AppContext } from '../util/context'
import { SET_SIZE_ONCHANGE, SET_QUANTITY_ONCHANGE } from '../util/constants'

export const ShoeInCart = () => {
	const { state, dispatch } = useContext(AppContext)

	const mapAllSizesForShoe = (index, gender) => {
		return state.cart
			.map(item => item.inventory)
			[index].filter(item => item.gender === gender)
			.map(item => item.size)
			.sort((a, b) => a - b)
	}

	const handleSizeOnChange = (e, index) => {
		dispatch({
			type: SET_SIZE_ONCHANGE,
			index,
			payload: e.target.value,
		})
	}
	const handleQuantityOnChange = (e, index) => {
		dispatch({
			type: SET_QUANTITY_ONCHANGE,
			index,
			payload: e.target.value,
		})
	}

	return (
		<div className="mt-4">
			{state.cart.map(({ image, shoe, selectedSize }, index) => (
				<div className="grid grid-cols-3 border-b-2">
					<img src={image} alt={shoe} />
					<div>
						<p>{shoe}</p>
						<p className="text-sm text-gray-500">
							{selectedSize.sizeGender === 'MEN'
								? "Men's Shoe"
								: "Women's Shoe"}
						</p>
						<div className="flex">
							<p className="text-sm mr-2 text-gray-500">Size</p>
							<span>
								<select onChange={e => handleSizeOnChange(e, index)}>
									{mapAllSizesForShoe(index, selectedSize.sizeGender).map(
										item => (
											<option selected={selectedSize.size === item}>
												{item}
											</option>
										)
									)}
								</select>
							</span>
						</div>
						<div className="flex">
							<p className="text-sm mr-2 text-gray-500">Quantity</p>
							<span>
								<select onChange={e => handleQuantityOnChange(e, index)}>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(quantity => (
										<option value={quantity}>{quantity}</option>
									))}
								</select>
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
