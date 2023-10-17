import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';
import { Outlet } from 'react-router';

const Admin = (): JSX.Element => {
	return (
		<>
			<Menu></Menu>
			<Container>
				<Outlet />
			</Container>
		</>
	);
};

export default Admin;
