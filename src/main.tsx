import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import LocalServiceWorkerRegister from './sw-register';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
LocalServiceWorkerRegister();
