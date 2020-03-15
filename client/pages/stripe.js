import StripeCheckout from 'react-stripe-checkout'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../util/context'

export default function Stripe() {
	const { state, dispatch } = useContext(AppContext)

	return (
		<div>
			{state.cart}
			<StripeCheckout
				// token={this.onToken}
				stripeKey={process.env.PUBLISHABLE_KEY}
			/>
			
		</div>
	)
}
