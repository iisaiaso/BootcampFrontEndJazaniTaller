import { createBrowserRouter, type RouteObject } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import Admin from '@/core/layouts/Admin';
import Home from '@/home';
import MineralTypeSearch from '@/generals/mineral-types/views/searchs';
import OfficeSearch from '@/generals/officies/views/search';

// Auth
import Auth from '@/core/layouts/Auth';
import Login from '@/Auth/login/views';
import { PrivateOutlet, PublicOutlet } from './CheckPageNavigation';

const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<PrivateOutlet>
				<Admin />
			</PrivateOutlet>
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/officies',
				element: <OfficeSearch />,
			},
			{
				path: '/mineral-types',
				element: <MineralTypeSearch />,
			},
		],
	},
	{
		path: '/login',
		element: (
			<PublicOutlet>
				<Auth />
			</PublicOutlet>
		),
		children: [
			{
				index: true,
				element: <Login />,
			},
		],
	},
];

export default createBrowserRouter(routes);
