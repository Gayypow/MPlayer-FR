import logo from '../assets/010-04.jpg';
import { Image, Input, Typography } from 'antd';
import './MainNavbar.scss';

const MainNavbar = () => {
	return (
		<div className='navContainer'>
			<Image src={logo} className='logo' preview={false} />
			<Input.Search
				placeholder='input search text'
				style={{ width: '600px', marginLeft: '50px' }}
			/>
		</div>
	);
};

export default MainNavbar;
