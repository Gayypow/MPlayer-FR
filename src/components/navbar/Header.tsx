import styles from '../../styles/header.module.scss';
import { useAppSelector } from '../../store/hooks';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HeaderButtons from '../HeaderButtons';
import React, { useCallback } from 'react';
import { TButtonObjProps } from '../../types/generalType';

function Header({ buttonsObj }: { buttonsObj: TButtonObjProps }) {
	const { breadcrumbs, language } = useAppSelector(state => state.general);
	const { search = true, header = '' } = buttonsObj;

	const navigate = useNavigate();

	const heading = useCallback(() => {
		const headerTranslation = breadcrumbs[breadcrumbs?.length - 1]?.title;
		return (
			<h2>
				{header !== '' ? (
					<div>
						<ArrowLeftOutlined
							style={{ marginRight: '10px' }}
							onClick={() => {
								// navigate(
								// 	location.includes('myAssets/fiches')
								// 		? '/myAssets'
								// 		: location.includes('myTasks')
								// 		? `/myTasks/${type}`
								// 		: `/${location.split('/')[location.split('/')?.length - 2]}`
								// );
								navigate(-1);
							}}
						/>
						{header}
					</div>
				) : (
					headerTranslation
				)}
			</h2>
		);
	}, [language, breadcrumbs]);

	return (
		<div className={styles['header']}>
			{search ? <div className={styles['header-middle']}>{heading()}</div> : ''}

			<div className={styles['header-bottom']}>
				{!search ? <div className={styles['header-middle']}>{heading()}</div> : ''}
				<HeaderButtons buttonsObj={buttonsObj} />
			</div>
		</div>
	);
}

export default React.memo(Header);
