import { FC, PropsWithChildren } from 'react';

import classes from './Ellipse.module.scss';

const EllipseStyles = {
	gray: classes['style--gray'],
	purple: classes['style--purple'],
	yellow: classes['style--yellow'],
	red: classes['style--red'],
};

type Props = PropsWithChildren<{
	className?: string;
	style?: keyof typeof EllipseStyles;
}>;

const Ellipse: FC<Props> = ({ children, className, style = 'gray' }) => {
	return (
		<div className={`${classes.ellipse} ${EllipseStyles[style]} ${className ?? ''}`}>
			{children}
		</div>
	);
};

export default Ellipse;
