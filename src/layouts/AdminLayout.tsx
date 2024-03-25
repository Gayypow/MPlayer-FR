import React, { Suspense } from 'react';
import { FloatButton, Grid, Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import styles from '../styles/mainLayout.module.scss';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AdminLayout: React.FC = () => {
	const { isSidebarOpen } = useAppSelector(state => state.general);

	const screens = useBreakpoint();

	return (
		<Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
			<Sidebar />
			<Layout
				className={styles['main-layout-container']}
				style={{
					width: !screens.lg ? '100%' : isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 80px)',
					paddingLeft: !screens.lg ? '0' : isSidebarOpen ? '250px' : '80px',
					minHeight: '100vh',
				}}
			>
				<Navbar />

				<FloatButton.BackTop visibilityHeight={400} />
				<Suspense fallback={<Spin />}>
					<Content>
						<Outlet />
					</Content>
				</Suspense>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
