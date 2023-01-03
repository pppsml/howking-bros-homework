import { lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import store from '@/store/store';

import { MainLayout } from '@/templates';
import { Routes, Route } from 'react-router-dom';

const NewsFeed = lazy(() => import('@/pages/NewsFeed'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const Redirect = lazy(() => import('@/pages/Redirect'));

function App() {
	return (
		<HelmetProvider>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route path="redirect" element={<Redirect />}></Route>

						<Route index element={<h1>index</h1>}></Route>
						<Route path="news" element={<NewsFeed />}></Route>
						<Route path="news/:newsId" element={<NewsPage />}></Route>
					</Route>
				</Routes>
			</Provider>
		</HelmetProvider>
	);
}

export default App;
