import type { ThemeConfig } from 'antd/es/config-provider/context';

const customTheme: ThemeConfig = {
	token: {
		colorPrimary: 'red',
		colorTextBase: '#002453',
		fontFamily: 'Inter',
		colorTextDisabled: '#666',
	},
	components: {
		Layout: {
			headerBg: '#FFFFFF',
		},
		Timeline: {
			colorBgContainer: 'inherit',
		},
		Image: {},
	},
};

export default customTheme;
export { customTheme };
