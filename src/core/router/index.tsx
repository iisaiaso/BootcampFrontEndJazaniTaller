import { createBrowserRouter, type RouteObject } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import Admin from '../layouts/Admin';
import Home from '../../home';
import OfficeSearch from '../../generals/officies/views/search';

// Auth
import Auth from '@/core/layouts/Auth';
import Login from '@/Auth/login/views';
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
	{
		path: '/login',
		element: <Auth />,
		children: [
			{
				index: true,
				element: <Login />,
			},
		],
	},
];

export default createBrowserRouter(routes);
