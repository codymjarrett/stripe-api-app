import { Header } from './Header'

export const Layout = ({ children }) => (
	<div>
		<Header />
		{children}
	</div>
)
