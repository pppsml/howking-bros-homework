import { FC } from 'react';

import classes from './Date.module.scss';

const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
];

type Props = {
	timestamp: number;
};

const DateComponent: FC<Props> = ({ timestamp }) => {
	const date = new Date(timestamp);

	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	return (
		<span>
			{day} {month} {year}
		</span>
	);
};
export default DateComponent;
