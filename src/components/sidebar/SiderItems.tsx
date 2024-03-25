import { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { FaMusic } from 'react-icons/fa';

export type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const SiderItems: () => MenuItem[] = () => {
	const { t } = useTranslation();

	return [getItem(t('Musics'), '/admin', <FaMusic />)];
};

export default SiderItems;
