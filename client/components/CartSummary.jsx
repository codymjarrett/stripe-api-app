import { useContext } from 'react'
import { AppContext } from '../util/context'

export const CartSummary = ({
	calculateTotalCartAmount,
	fauxShippingAndHandling,
	calculateTotalTaxAndShipping,
	calculateTaxPerCartItem,
}) => {
	const { state, dispatch } = useContext(AppContext)

	return (
		<div className="mt-12">
			<div className="font-semibold">SUMMARY</div>
			<div className="mt-6">
				<div className="flex justify-between mt-1">
					<div>Subtotal</div>
					<div> ${calculateTotalCartAmount()}.00</div>
				</div>
				<div className="flex justify-between mt-1">
					<div>Shipping & Handling</div>
					<div>${fauxShippingAndHandling[0]}</div>
				</div>
				<div className="flex justify-between mt-1">
					<div>Tax</div>
					<div>${calculateTaxPerCartItem()}</div>
				</div>
				<div className="flex justify-between mt-6">
					<div className="font-semibold">TOTAL</div>
					<div className="font-semibold">${calculateTotalTaxAndShipping()}</div>
				</div>
			</div>
		</div>
	)
}
