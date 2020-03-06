import gql from 'graphql-tag'

export const SHOES_QUERY = gql`
	{
		getAllShoes {
			id
			name
			image
			price
			gender
			inventory {
				size
				id
				gender
				quantity
			}
		}
	}
`
