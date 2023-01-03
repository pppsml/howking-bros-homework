import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Title } from '@/components';

const Redirect: FC = () => {
	const { search } = useLocation();
	const href = search.replace('?=', '');

	useEffect(() => {
		if (href) window.location.replace(href);
	}, []);

	if (!href) return <Title>Нет ссылки для перенаправления</Title>;

	return <Title>Redirecting.../ Перенаправление...</Title>;
};

export default Redirect;
