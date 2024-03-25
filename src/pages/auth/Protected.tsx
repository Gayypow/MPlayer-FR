import { useEffect, type FC } from 'react';

import { Navigate } from 'react-router-dom';

export type TProps = {
	authPath?: string;
	outlet: JSX.Element;
};

const Protected: FC<TProps> = ({ authPath, outlet }) => {
	const token = sessionStorage.getItem('access');

	if (token) {
		return outlet;
	}
	return <Navigate to={{ pathname: authPath }} />;
};

Protected.defaultProps = {
	authPath: '/login',
};

export default Protected;
