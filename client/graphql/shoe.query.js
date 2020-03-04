import gql from 'graphql-tag'

export const SHOE_QUERY = gql`
	query getOneShoeById($shoeId: ID!) {
		getOneShoe(shoeId: $shoeId) {
			id
			name
			image
			price
			gender
			inventory {
				size
				gender
				quantity
				id
			}
		}
	}
`
