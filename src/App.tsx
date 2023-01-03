import { lazy } from 'react';

import { Provider } from 'react-redux';
import store from '@/store/store';

import { MainLayout } from '@/templates';
import { Routes, Route } from 'react-router-dom';

const NewsFeed = lazy(() => import('@/pages/NewsFeed'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));

function App() {
	return (
		<>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<h1>index</h1>}></Route>
						<Route path="news" element={<NewsFeed />}></Route>
						<Route path="news/:newsId" element={<NewsPage />}></Route>
					</Route>
				</Routes>
			</Provider>
		</>
	);
}

export default App;
