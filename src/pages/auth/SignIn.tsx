import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './SignIn.scss';
import { Form, notification, Button, Input } from 'antd';
import { TLogin } from '../../types/auth';

const { Item } = Form;

const SignIn = () => {
	const { t } = useTranslation();
	const [loadings, setLoadings] = useState<boolean>(false);

	// socket for loading

	const navigate = useNavigate();

	const onFinish = async (values: TLogin) => {
		sessionStorage.removeItem('access');
		setLoadings(true);
		if (values.username === 'admin' && values.password === 'admin') {
			sessionStorage.setItem('access', 'done');
			navigate('/admin');
		} else {
			notification.error({
				message: 'Wrong values',
				description: 'Incorrect username or password',
			});
		}
		setLoadings(false);
	};

	return (
		<div className='login-main'>
			<div className='left'>
				<Form
					className='form'
					layout='vertical'
					initialValues={{ remember: false }}
					onFinish={onFinish}
					autoComplete='off'
				>
					<div>
						<Item name='username' label='Username' className='input'>
							<Input placeholder='Enter your Username' type='text'></Input>
						</Item>

						<Item
							name='password'
							label='Password'
							rules={[{ message: 'Enter your Password' }]}
							className='input'
						>
							<Input.Password type='password' placeholder='Enter your Password'></Input.Password>
						</Item>

						<Item>
							<Button type='primary' htmlType='submit' loading={loadings} className='btn'>
								{!loadings && 'Sign in'}
							</Button>
						</Item>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default SignIn;

//
