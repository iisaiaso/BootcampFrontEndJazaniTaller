import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { type LoginRequest, type UserSecurityResponse } from '@/Auth/login/domain';
import useLogin from '@/Auth/login/application/hooks/useLogin';
import { LocalStorageSession } from '@/core/sessions';
import { useNavigate } from 'react-router-dom';

const index = (): JSX.Element => {
	const navigate = useNavigate();
	// Atributtes
	const formik = useFormik<LoginRequest>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Ingrese un email valido').required('Email es requerido'),
			password: Yup.string().required('Password es requerido'),
		}),
		onSubmit: (values: LoginRequest) => {
			console.log('Values', values);
			void loginAuth(values);
		},
	});

	// React Query
	const { mutateAsync, isSuccess, isError } = useLogin();

	// Methods
	const loginAuth = async (payload: LoginRequest): Promise<void> => {
		const response: UserSecurityResponse = await mutateAsync(payload);
		console.log('logi', response);

		LocalStorageSession.saveAuthorization(response);
		navigate('/officies');
	};

	return (
		<Row className="justify-content-center align-items-center vh-100">
			<Col xs={12} sm={8} md={7} lg={6} xl={5} xxl={4}>
				<Card className="shadow-lg rounded">
					<Card.Header className="text-center">Login</Card.Header>
					<Card.Body>
						<Form className="d-grid gap-3" onSubmit={formik.handleSubmit} noValidate>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
								{(formik.touched.email ?? false) && formik.errors.email != null && (
									<small className="text-danger">{formik.errors.email}</small>
								)}
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={formik.values.password}
									onChange={formik.handleChange}
								/>
								{(formik.touched.password ?? false) && formik.errors.password != null && (
									<small className="text-danger">{formik.errors.password}</small>
								)}
							</Form.Group>
							<hr />
							<Button type="submit" variant="primary">
								Ingresar
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default index;
