import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { SHOE_QUERY } from '../../graphql/shoe.query'
import { AppContext } from '../../util/context'
import { SELECT_SHOE_GENDER } from '../../util/constants'
import { selectShoeGender } from '../../util/actions'

const ShoeId = () => {
	const { state, dispatch } = useContext(AppContext)
	const router = useRouter()
	const { shoeId } = router.query
	const { data, loading, error } = useQuery(SHOE_QUERY, {
		variables: { shoeId },
	})

	const handleSelectOnChange = e => {
		selectShoeGender(dispatch, e.target.value)
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
	const { id, name, image, price, inventory, gender } = data.getOneShoe
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
					<select onChange={handleSelectOnChange}>
						{renderAppropriateOptions(gender)}
					</select>
				</div>
				<div className="grid grid-cols-4 gap-4 mt-4">
					{inventory
						.filter(shoeSize => shoeSize.gender === state.genderSelection)
						.map(({ size, quantity, id, gender }) => (
							<button className="block border-solid border-2 border-gray-400 rounded-md mt-4 py-4">
								{size}
							</button>
						))}
				</div>
			</div>
		</div>
	)
}
export default ShoeId
