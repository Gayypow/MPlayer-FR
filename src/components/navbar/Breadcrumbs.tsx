import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react';

function Breadcrumbs() {
	const { breadcrumbs } = useAppSelector(state => state.general);
	const { t } = useTranslation();
	function itemRender(route: any, params: any, items: ItemType[], paths: any) {
		params;
		items;
		return !route.path ? (
			<span>{route.title}</span>
		) : (
			<Link to={paths.join('/')}>{route.title}</Link>
		);
	}

	return (
		<Breadcrumb
			items={[
				{
					title: t('Home'),
					path: '/',
				},
				...breadcrumbs,
			]}
			itemRender={itemRender}
		/>
	);
}

export default React.memo(Breadcrumbs);
