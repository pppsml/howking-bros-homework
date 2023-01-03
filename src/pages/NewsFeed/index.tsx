import {
	ChangeEvent,
	FC,
	FormEventHandler,
	PropsWithChildren,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import axios from 'axios';

import Helmet from 'react-helmet';

import { Title, Input, Button, Icon } from '@/components';
import { Container } from '@/templates';

import { useDebounce } from '@/hooks';
import { News } from '@/store/types';

import classes from './NewsFeed.module.scss';
import NewsFeedItem from './NewsFeedItem/NewsFeedItem';

import { fetchNews } from '@/store/actions/news';
import { AppDispatch, useAppSelector } from '@/store/store';

type Props = PropsWithChildren<{}>;

const NewsFeed: FC<Props> = ({}) => {
	const error = useAppSelector(({ news }) => news.error);
	const isLoading = useAppSelector(({ news }) => news.isLoading);
	const news = useAppSelector(({ news }) => news.items);

	const [searchValue, setSearchValue] = useState<string>('');
	const [itemsPerPage] = useState<number>(9);

	const deboucedFetchNews = useDebounce(() => {
		AppDispatch(fetchNews({ page: 1, searchValue }));
	}, 500);

	useEffect(() => {
		deboucedFetchNews();
	}, [searchValue]);

	const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>, value: string) => {
		setSearchValue(value);
	};

	const searchSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
	};

	let visibleContent: ReactNode = news.map((newsData) => (
		<NewsFeedItem {...newsData} key={newsData.id} />
	));
	if (isLoading) {
		visibleContent = <h1>Loading...</h1>;
	}
	if (error) {
		visibleContent = <h1>{error}</h1>;
	}

	return (
		<div className={classes.newsfeed__wrapper}>
			<Helmet title="SDAEM.BY - Новости" />
			<Container>
				<div className={classes.header}>
					<Title>Новости</Title>
					<form className={classes.searchForm} onSubmit={searchSubmitHandler}>
						<Input
							name="search"
							value={searchValue}
							className={classes.searchForm__input}
							onChange={searchChangeHandler}
						/>
						<Button className={classes.searchForm__button} type="submit" style="purple-solid">
							<Icon name="search" />
						</Button>
					</form>
				</div>

				<section>{visibleContent}</section>
			</Container>
		</div>
	);
};

export default NewsFeed;
