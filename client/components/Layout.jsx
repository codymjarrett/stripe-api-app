import { Header } from './Header'
import { ShoeSearch } from './ShoeSearch'

export const Layout = ({ children }) => (
	<div>
		<Header />
		<ShoeSearch />
		{children}
	</div>
)
