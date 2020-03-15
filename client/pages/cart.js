import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { AppContext } from '../util/context'
import { Button } from '../components/Button'
import { ShoeInCart } from '../components/ShoeInCart'
import { CartSummary } from '../components/CartSummary'
import { Modal } from '../components/Modal'
import { SET_STRIPE_OBJECT } from '../util/constants'

export default function Cart() {
	const { state, dispatch } = useContext(AppContext)
	const [showModal, setShowModal] = useState(false)
	const fauxShippingAndHandling = useState('5.00')
	const fauxTax = useState('12.16')

	useEffect(() => {}, [state])

	const calculateTotalCartAmount = () =>
		state.cart.reduce((prev, curr) => prev + curr.price, 0)

	const calculateTaxPerCartItem = () =>
		parseFloat(fauxTax[0]) * state.cart.length

	const calculateTotalTaxAndShipping = () =>
		parseInt(calculateTotalCartAmount()) +
		parseInt(fauxShippingAndHandling[0]) +
		calculateTaxPerCartItem()

	const checkout = () => {
		dispatch({
			type: SET_STRIPE_OBJECT,
			payload: {
				totalPrice: calculateTotalTaxAndShipping(),
				items: state.cart.slice(0).map(item => ({
					name: item.shoe,
					image: item.image,
					size: item.selectedSize.size,
					quantity: item.selectedSize.quantity,
				})),
			},
		})
		setShowModal(!showModal)
	}
	

	if (!state.cart.length) {
		return <div className="text-center mt-30vh text-2xl">CART IS EMPTY!</div>
	}

	if (state.cart.length > 0) {
		return (
			<div className="p-4">
				<div className="text-center border-b-2 pb-12">
					<div className="text-lg font-semibold ">CART</div>
					<div className="">
						{state.cart.length} Item{state.cart.length > 1 ? "'s" : null} | $
						{calculateTotalCartAmount()}
					</div>
				</div>
				<ShoeInCart />
				<CartSummary
					calculateTotalCartAmount={calculateTotalCartAmount}
					fauxShippingAndHandling={fauxShippingAndHandling}
					calculateTaxPerCartItem={calculateTaxPerCartItem}
					calculateTotalTaxAndShipping={calculateTotalTaxAndShipping}
				/>
				<div className="mt-12">
					<Button
						handleButtonClick={checkout}
						text="GO TO CHECKOUT"
						large={true}
					/>
				</div>
				<Modal show={showModal} handleClose={setShowModal}>
				<div className="px-8">
					<div className="mt-8">
						<Button
							handleButtonClick={() => Router.push('/stripe')}
							text="Guest Checkout"
							small={true}
							round={true}
						/>
					</div>
					<div className="mt-6">
						<Button
							handleButtonClick={null}
							text="Member Checkout"
							small={true}
							round={true}
						/>
					</div>
				</div>
				</Modal>
			</div>
		)
	}
}

