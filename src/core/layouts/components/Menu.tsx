import { useState, type FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LocalStorageSession } from '@/core/sessions';

// Icons
import { BiUserCircle } from 'react-icons/bi';

const Menu: FC = () => {
	const navigate = useNavigate();
	const [user, userSet] = useState('');

	useEffect(() => {
		const isAuth = LocalStorageSession.isValidationAuthorization();

		if (isAuth) {
			const user = LocalStorageSession.getAuthorization();
			userSet(`${user.name} ${user.lastName}`);
		}
	}, []);

	const closeSesion = (): void => {
		LocalStorageSession.removeAuthorization();
		navigate('/login');
	};
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<NavDropdown title="General" id="basic-nav-dropdown">
							<Link className="dropdown-item" to="officies">
								Officies
							</Link>
							<Link className="dropdown-item" to="mineral-types">
								Mineral Types
							</Link>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<div className="d-flex">
							<div className="mt-1 fs-5">
								<BiUserCircle />
							</div>
							<NavDropdown title={user} id="basic-nav-dropdown">
								<NavDropdown.Item
									className="dropdown-item"
									onClick={() => {
										closeSesion();
									}}
								>
									Cerrar Sesion
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Configuraciones</NavDropdown.Item>
							</NavDropdown>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
