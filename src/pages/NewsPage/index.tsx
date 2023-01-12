import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { Container } from '@/templates';

import { News } from '@/store/types';

import { Link, Title, Flex, Date, Ellipse, BreadCrumbs } from '@/components';
import { VKIcon, FBIcon, ViberIcon, TGIcon, WAPPIcon } from '@/components/UI/icons';

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

const getRandomNews = (count: number): Promise<AxiosResponse<News, any>>[] => {
	const newsIds: number[] = [];
	const promises: Promise<AxiosResponse<News, any>>[] = [];

	while (newsIds.length < count) {
		const number = Math.ceil(Math.random() * 50);
		if (newsIds.includes(number)) continue;
		newsIds.push(number);
	}

	newsIds.forEach((id) => promises.push(axios.get(`/api/news/${id}`)));

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

		Promise.all(getRandomNews(3))
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
						<Flex direction="column" items="stretch" gap={27} className={classes.header}>
							<BreadCrumbs
								color="purple"
								items={[
									<BreadCrumbs.Home />,
									<BreadCrumbs.Link href="/news">Новости</BreadCrumbs.Link>,
									<BreadCrumbs.Text>{news.data.title}</BreadCrumbs.Text>,
								]}
							/>
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
						</Flex>
						<div>
							<img
								className={classes.image}
								src={news.data.img.src ?? mockImage}
								alt={news.data.img.alt ?? 'Фотография интерьера квартиры'}
							/>
						</div>
						<div className={classes['content']}>{news.data.content}</div>
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
