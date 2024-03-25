import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsSidebarOpen } from '../../store/general/generalSlice';
import { Avatar, Divider, Drawer, Grid, Menu, Typography } from 'antd';
const { useBreakpoint } = Grid;
import { useNavigate } from 'react-router-dom';
import SiderItems from './SiderItems';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/sidebar.module.scss';
import im1 from '../../assets/010-04.jpg';

const StyledDrawer = styled(Drawer)`
	& .ant-drawer-body {
		padding: 0;
		position: relative;
	}
`;

function Sidebar() {
	const [localSearch] = useState<string>('');
	const { isSidebarOpen, me } = useAppSelector(state => state.general);
	const dispatch = useAppDispatch();
	const screens = useBreakpoint();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const activeMode = () => {
		return location.pathname.split('/').splice(0, 2).join('/');
	};

	const doesItemIncludeSearch = (item: any) => {
		if (!item) return false;
		const label = 'label' in item ? item.label : '';
		const labelLower = (label ?? '').toLowerCase();
		const searchLower = localSearch.toLowerCase();
		const index = labelLower.indexOf(searchLower);
		if (index !== -1) {
			const highlightedLabel = (
				<span>
					{label?.substring(0, index)}
					<span style={{ backgroundColor: '#ffd591' }}>
						{label?.substr(index, localSearch.length)}
					</span>
					{label?.substring(index + localSearch.length)}
				</span>
			);

			item.label = highlightedLabel;
			return true;
		}

		if ('children' in item && Array.isArray(item.children)) {
			for (const child of item.children) {
				if (doesItemIncludeSearch(child)) {
					return true;
				}
			}
		}

		return false;
	};

	const menuSection = () => {
		return (
			<Menu
				className={styles['menu-section']}
				selectedKeys={[activeMode()]}
				onSelect={({ key }) => {
					navigate(key);
				}}
				style={{ color: '#002453', fontSize: '14px' }}
				mode='inline'
				items={SiderItems()}
				onClick={e => {
					navigate(`${e.key}`, { replace: true });
				}}
			/>
		);
	};

	return screens.lg ? (
		<Sider
			breakpoint='lg'
			width={250}
			trigger={null}
			collapsible
			collapsed={!isSidebarOpen}
			onCollapse={value => dispatch(setIsSidebarOpen(!value))}
			className={styles['sidebar']}
		>
			<div
				style={{
					flexDirection: isSidebarOpen || (!isSidebarOpen && !screens.lg) ? 'row' : 'column',
				}}
				className={styles['sidebar-logo-open-control']}
			>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Avatar src={im1} size={60} shape='circle'></Avatar>
				</div>
				{isSidebarOpen && (
					<Typography.Title
						style={{
							color: 'red',
							marginBottom: '0',
						}}
						level={3}
					>
						Musics
					</Typography.Title>
				)}
			</div>
			{menuSection()}
		</Sider>
	) : (
		<StyledDrawer
			placement='left'
			closable={false}
			onClose={() => {
				dispatch(setIsSidebarOpen(false));
			}}
			closeIcon={false}
			width={280}
			open={isSidebarOpen}
		>
			{menuSection()}
		</StyledDrawer>
	);
}

export default React.memo(Sidebar);

// "build": "node ./src/versionBuild.js && tsc && vite build",
