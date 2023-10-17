import { useState, useEffect } from 'react';

import { OfficeRepository } from '../../infrastructure';
import { type OfficeResponse } from '../../domain';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const index = (): JSX.Element => {
	const [mineralTypes, mineralTypesSet] = useState<OfficeResponse[]>([]);

	useEffect(() => {
		void loadMineralTypes();
	}, []);

	const loadMineralTypes = async (): Promise<void> => {
		const response = await OfficeRepository.findAll();

		mineralTypesSet(response.data);
		console.log('response: ', response);
	};
	return (
		<Row className="pt-2">
			<Col xs={12}>
				<Card>
					<Card.Header>Listado de Tipo de Minerales</Card.Header>
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
								{mineralTypes.length > 0 &&
									mineralTypes.map(mineralType => (
										<tr key={mineralType.id}>
											<td>{mineralType.id}</td>
											<td>{mineralType.name}</td>
											<td>{mineralType.description}</td>
											<td>
												<Badge pill bg={mineralType.state ? 'success' : 'danger'}>
													{mineralType.state ? 'Activo' : 'Disable'}
												</Badge>
											</td>
											<td>{mineralType.registrationDate}</td>
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
