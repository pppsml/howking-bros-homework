import { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import classes from './Link.module.scss';

const LinkStyles = {
	underline: classes['link--underline'],
};
type LinkStylesType = typeof LinkStyles;

type Props = PropsWithChildren<{
	target?: HTMLAttributeAnchorTarget;
	href?: string;
	className?: string;
	style?: keyof LinkStylesType;
}>;

const MyLink: FC<Props> = ({ href = '#', className = '', style, children, ...restProps }) => {
	return (
		<Link
			className={`${classes.link} ${style ? LinkStyles[style] : ''} ${className}`}
			to={href}
			{...restProps}>
			{children}
		</Link>
	);
};

export default MyLink;
