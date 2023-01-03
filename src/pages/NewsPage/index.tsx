import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Container } from '@/templates';

import { News } from '@/store/types';

import mockImage from '@/assets/newsMockImage.png';
import classes from './NewsPage.module.scss';
import { Title } from '@/components';

const NewsPage: FC = () => {
	const { newsId } = useParams();

	const [isLoading, setLoading] = useState<boolean>(false);
	const [news, setNews] = useState<News | null>(null);

	useEffect(() => {
		setLoading(true);
		axios
			.get<News>(`/api/news/${newsId}`)
			.then((response) => {
				setLoading(false);
				setNews(response.data);
			})
			.catch((e) => {
				setLoading(false);
				setNews(null);
			});
	}, []);

	return (
		<div className={classes.newspage__wrapper}>
			<Container size="thin">
				{isLoading ? ( // если загрузка вернуть лоадер
					'Loading...'
				) : !news ? ( // если новости не существует, то вернуть "Новость не найдена"
					'Новость не найдена'
				) : (
					// если всё ок то вернуть контент
					<>
						<div className={classes.header}>
							<Title>{news.data.title}</Title>
							<div>{news.data.publishedAt}</div>
						</div>
						<div>
							<img
								src={news.data.img.src ?? mockImage}
								alt={news.data.img.alt ?? 'Фотография интерьера квартиры'}
							/>
						</div>
						<div style={{ whiteSpace: 'pre-wrap' }}>{news.data.content}</div>
					</>
				)}
			</Container>
		</div>
	);
};

export default NewsPage;
