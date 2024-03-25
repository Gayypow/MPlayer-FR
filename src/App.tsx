import './plugins/reactI18n';
import './styles/App.scss';
import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import customTheme from './plugins/antd';

import Musics from './pages/Musics';
import AdminLayout from './layouts/AdminLayout';
// const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Protected = lazy(() => import('./pages/auth/Protected'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));

const App: FC = () => {
	return (
		<ConfigProvider theme={customTheme}>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Musics />} />
				</Route>

				<Route
					path='/login'
					element={
						<Suspense fallback={<Spin />}>
							<SignIn />
						</Suspense>
					}
				/>

				<Route path='/admin' element={<Protected outlet={<AdminLayout />} />}>
					<Route path='' element={<Musics />} />
				</Route>
			</Routes>
		</ConfigProvider>
	);
};

export default App;
