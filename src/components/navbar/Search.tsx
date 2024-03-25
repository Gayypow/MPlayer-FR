import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsSearchModalOpen } from '../../store/general/generalSlice';
import styles from '../../styles/search.module.scss';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { isMac } from '../../functions';
import { FilterOutlined } from '@ant-design/icons';
const { Search } = Input;

const StyledSearch = styled(Search)`
	& .ant-input {
		border-radius: 2px !important;
	}
	& .ant-input-search-button {
		border-radius: 2px !important;
	}
`;

function SearchComponent(props: { renderedIn: string }) {
	const location = useLocation().pathname;
	const { renderedIn = location } = props;
	const dispatch = useAppDispatch();
	const { tableSearchValue, isSearchModalOpen, filterExists } = useAppSelector(
		state => state.general
	);
	const { t } = useTranslation();

	useEffect(() => {
		const handleFKeyPress = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && (event.key === 'f' || event.key === 'F')) {
				event.preventDefault();
				handleOpenModal();
			}
		};

		document.addEventListener('keydown', handleFKeyPress);

		return () => {
			document.removeEventListener('keydown', handleFKeyPress);
		};
	}, []);
	const handleOpenModal = () => {
		dispatch(setIsSearchModalOpen({ ...isSearchModalOpen, [renderedIn ?? location]: true }));
	};

	return (
		<div>
			<StyledSearch
				placeholder={t('SearchPlaceholder').replace('$', isMac() ? 'cmd' : 'ctrl')}
				onSearch={handleOpenModal}
				style={{
					width: 300,
					borderRadius: '2px',
				}}
				value={tableSearchValue}
				className={styles['search-input']}
				onClick={handleOpenModal}
				key={renderedIn}
				onMouseDown={handleOpenModal}
				suffix={filterExists ? <FilterOutlined style={{ color: 'red', fontSize: '16px' }} /> : null}
			/>
		</div>
	);
}

export default React.memo(SearchComponent);
