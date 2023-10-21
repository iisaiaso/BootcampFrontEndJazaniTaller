import { useState, useEffect } from 'react';

import { MineralTypeRepository } from '../../infrastructure';
import { type MineralTypeResponse } from '../../domain';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const index = (): JSX.Element => {
	const [mineralTypes, mineralTypesSet] = useState<MineralTypeResponse[]>([]);

	useEffect(() => {
		void loadMineralTypes();
	}, []);

	const loadMineralTypes = async (): Promise<void> => {
		const response: any = await MineralTypeRepository.findAll();

		mineralTypesSet(response);

		console.log('response: ', response);
	};

	return (
		<>
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
										<th>Slug</th>
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
												<td>{mineralType.slug}</td>
												<td>
													<Badge pill bg={mineralType.state ? 'success' : 'danger'}>
														{mineralType.state ? 'Activo' : 'Disable'}
													</Badge>
												</td>

												<td>
													{format(
														new Date(mineralType.registrationDate.toString()),
														'dd MMMM yyyy',
														{ locale: es },
													)}
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
