import { useState, useEffect } from 'react';

import { OfficeRepository } from '../../infrastructure';
import { type OfficeResponse } from '../../domain';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

// Date
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const index = (): JSX.Element => {
	const [offices, officesSet] = useState<OfficeResponse[]>([]);

	useEffect(() => {
		void loadOffices();
	}, []);

	const loadOffices = async (): Promise<void> => {
		const response = await OfficeRepository.findAll();

		officesSet(response);
		console.log('response: ', response);
	};
	return (
		<Row className="pt-2">
			<Col xs={12}>
				<Card>
					<Card.Header>Listado de Offices</Card.Header>
					<Card.Body>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Nombre</th>
									<th>Descripcion</th>
									<th>Estado</th>
									<th>Fecha</th>
								</tr>
							</thead>
							<tbody>
								{offices.length > 0 &&
									offices.map(office => (
										<tr key={office.id}>
											<td>{office.id}</td>
											<td>{office.name}</td>
											<td>{office.description}</td>
											<td>
												<Badge pill bg={office.state ? 'success' : 'danger'}>
													{office.state ? 'Activo' : 'Disable'}
												</Badge>
											</td>
											<td>
												{format(new Date(office.registrationDate.toString()), 'dd MMMM yyyy', {
													locale: es,
												})}
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default index;
