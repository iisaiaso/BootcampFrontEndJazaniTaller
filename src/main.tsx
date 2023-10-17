import React from 'react';
import ReactDOM from 'react-dom/client';

import '@popperjs/core';
import 'bootstrap';

import './core/styles/app.scss';

import { RouterProvider } from 'react-router-dom';
import router from './core/router/index.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
