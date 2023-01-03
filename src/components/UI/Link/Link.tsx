import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import classes from './Link.module.scss';

const LinkStyles = {
	'purple-transparent': classes['link--purple-transparent'],
	underline: classes['link--underline'],
};
type LinkStylesType = typeof LinkStyles;

type Props = PropsWithChildren<{
	href?: string;
	className?: string;
	style?: keyof LinkStylesType;
}>;

const MyLink: FC<Props> = ({ href = '#', className = '', style, children }) => {
	return (
		<Link className={`${classes.link} ${style ? LinkStyles[style] : ''} ${className}`} to={href}>
			{children}
		</Link>
	);
};

export default MyLink;
