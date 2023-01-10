import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { Container } from '@/templates';

import { News } from '@/store/types';

import {
	Link,
	Title,
	VKIcon,
	FBIcon,
	ViberIcon,
	TGIcon,
	WAPPIcon,
	Flex,
	Date,
	Ellipse,
} from '@/components';
import NewsFeedItem from '../NewsFeed/NewsFeedItem/NewsFeedItem';

import mockImage from '@/assets/newsMockImage.png';
import classes from './NewsPage.module.scss';

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

const getRandomNews = () => {
	const promises: Promise<AxiosResponse<News, any>>[] = [];

	for (let i = 0; i < 3; i++) {
		promises.push(axios.get<News>(`/api/news/${Math.floor(Math.random() * 50)}`));
	}

	return promises;
};

const NewsPage: FC = () => {
	const { newsId } = useParams();

	const [isLoading, setLoading] = useState<boolean>(false);
	const [news, setNews] = useState<News | null>(null);
	const [readalsoNews, setReadalsoNews] = useState<News[]>([]);

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

		Promise.all(getRandomNews())
			.then((data) => {
				const news = data.map((i) => i.data);
				setReadalsoNews(news);
			})
			.catch((e) => console.log(e));
	}, []);

	return (
		<div className={classes.newspage__wrapper}>
			{/* main content */}
			<Container size="thin">
				{isLoading ? ( // если загрузка вернуть лоадер
					'Loading...'
				) : !news ? ( // если новости не существует, то вернуть:
					'Новость не найдена'
				) : (
					// если всё ок то вернуть контент
					<>
						<div className={classes.header}>
							<Title>{news.data.title}</Title>
							<Flex items="center" justify="space-between">
								<Ellipse style="purple">
									<Date timestamp={news.data.publishedAt} />
								</Ellipse>
								<Flex gap={15} items="center">
									<span>Поделиться</span>
									<Flex as="ul" gap={20} className={classes['socialLink--list']}>
										{links.map(({ icon, href }) => (
											<li key={href}>
												<Link href={`/redirect?=${href}`} target="_blank">
													<Ellipse style="purple" className={classes['socialLink']}>
														{icon}
													</Ellipse>
												</Link>
											</li>
										))}
									</Flex>
								</Flex>
							</Flex>
						</div>
						<div>
							<img
								className={classes.image}
								src={news.data.img.src ?? mockImage}
								alt={news.data.img.alt ?? 'Фотография интерьера квартиры'}
							/>
						</div>
						<div style={{ whiteSpace: 'pre-wrap' }}>{news.data.content}</div>
					</>
				)}
			</Container>

			{/* Блок: "Читайте также" */}
			<div className={classes['readalso__wrapper']}>
				<Container>
					<Title as="h2">Читайте также</Title>
					<section className={classes['readalso__feed']}>
						{readalsoNews.map(({ data, id }) => (
							<NewsFeedItem data={data} id={id} key={id} />
						))}
					</section>
				</Container>
			</div>
		</div>
	);
};

export default NewsPage;
