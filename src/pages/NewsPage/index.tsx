import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Container } from '@/templates';

import { News } from '@/store/types';

import mockImage from '@/assets/newsMockImage.png';
import classes from './NewsPage.module.scss';
import { Link, Title, VKIcon, FBIcon, ViberIcon, TGIcon, WAPPIcon } from '@/components';

const links = [
	{
		href: 'https://vk.com',
		icon: <VKIcon />,
	},
	{
		href: 'https://facebook.com',
		icon: <FBIcon />,
	},
	{
		href: 'https://viber.com',
		icon: <ViberIcon />,
	},
	{
		href: 'https://web.telegram.org',
		icon: <TGIcon />,
	},
	{
		href: 'https://web.whatsapp.com/',
		icon: <WAPPIcon />,
	},
];

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
							<div>
								<div>{news.data.publishedAt}</div>
								<ul className={classes['socialLink--list']}>
									{links.map(({ icon, href }) => (
										<li key={href}>
											<Link
												style="purple-transparent"
												className={classes['socialLink']}
												href={`/redirect?=${href}`}
												target="_blank">
												{icon}
											</Link>
										</li>
									))}
								</ul>
							</div>
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
