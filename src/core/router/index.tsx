import { createBrowserRouter, type RouteObject } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import Admin from '../layouts/Admin';
import Home from '../../home';
import OfficeSearch from '../../generals/officies/views/search';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Admin />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/officies',
				element: <OfficeSearch />,
			},
		],
	},
];

export default createBrowserRouter(routes);
