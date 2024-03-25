import { MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Grid, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from '../../styles/navbar.module.scss';
import { setIsSidebarOpen } from '../../store/general/generalSlice';
import React from 'react'; // Import useRef and useEffect

const { useBreakpoint } = Grid;

function Navbar() {
	const screens = useBreakpoint();
	``;
	const dispatch = useAppDispatch();
	const { isSidebarOpen } = useAppSelector(state => state.general);

	return (
		<nav className={styles['navbar']}>
			<div className={styles['navbar-top']}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
					<Button
						type='text'
						icon={
							isSidebarOpen || (!isSidebarOpen && !screens.lg) ? (
								<MenuFoldOutlined size={20} />
							) : (
								<MenuUnfoldOutlined size={20} />
							)
						}
						onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
						className={styles['sidebar-open-button']}
					/>
				</div>
			</div>
		</nav>
	);
}

export default React.memo(Navbar);
