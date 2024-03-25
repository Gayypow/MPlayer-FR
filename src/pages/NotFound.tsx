import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { Button, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setBreadcrumbs } from '../store/general/generalSlice';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const StyledDiv = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: calc(100vh - 64px);
`;

function NotFound() {
	const dispatch = useAppDispatch();
	const splittedLocation = useLocation()?.pathname?.split('/');
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { language } = useAppSelector(state => state.general);

	useEffect(() => {
		dispatch(
			setBreadcrumbs([
				{
					title: splittedLocation?.[splittedLocation?.length - 1],
				},
			])
		);
	}, [language]);
	return (
		<StyledDiv>
			<Result
				status='404'
				title='404'
				subTitle={t('pageNotFound')}
				extra={
					<Button type='primary' onClick={() => navigate('/')}>
						{t('Home')}
					</Button>
				}
			/>
		</StyledDiv>
	);
}

export default React.memo(NotFound);
