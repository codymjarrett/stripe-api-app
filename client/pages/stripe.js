import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { CheckoutForm } from '../components/stripe/CheckoutForm'

const stripePromise = loadStripe('pk_test_Z28yIrPvMmHBCOCBrPxHvpE200cDhfwTGT')

export default function Stripe() {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	)
}
