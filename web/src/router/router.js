import Router5, { loggerPlugin } from 'router5'
import listenersPlugin from 'router5-listeners';
import historyPlugin from 'router5-history';
import routes from './routes';

export default (useListenersPlugin = false) => {
	const router = new Router5(routes)
		.setOption('useHash', false)
		.setOption('defaultRoute', 'home')
		.usePlugin(loggerPlugin())
		.usePlugin(historyPlugin());
	if (useListenersPlugin) {
		router.usePlugin(listenersPlugin());
	}

	return router;
}