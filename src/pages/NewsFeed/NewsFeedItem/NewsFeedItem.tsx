import { FC } from 'react';

import { Button, Date, Ellipse, Link, Title } from '@/components';

import { News } from '@/store/types';
import classes from './NewsFeedItem.module.scss';
import mockImage from '@/assets/newsMockImage.png';

type Props = News;

const NewsFeedItem: FC<Props> = ({ data, id }) => {
	const { img, previewDescr, publishedAt, title } = data;

	return (
		<article className={classes.newsFeedItem}>
			<img
				className={classes.newsFeedItem__img}
				src={img.src ?? mockImage}
				alt={img.alt ?? 'Фотография интерьера квартиры'}
			/>
			<div className={classes.newsFeedItem__content}>
				<Title className={classes.newsFeedItem__title} as="h3">
					{title}
				</Title>
				<p className={classes.newsFeedItem__descr}>{previewDescr}</p>
				<span className={classes.newsFeedItem__separator} />
				<div className={classes.newsFeedItem__footer}>
					<Ellipse>
						<Date timestamp={publishedAt} />
					</Ellipse>
					<Link href={`/news/${id}`}>
						<Ellipse style="purple">Читать</Ellipse>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default NewsFeedItem;
