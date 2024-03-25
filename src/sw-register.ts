export default function LocalServiceWorkerRegister() {
	const swPath = `/public/sw.js`;
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register(swPath, { scope: '/' }).then(registration => {
				console.log('Service worker registered', registration.scope);
			});
		});
	}
}
