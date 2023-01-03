import { FC, MouseEventHandler, PropsWithChildren } from 'react';

import classes from './Button.module.scss';

const ButtonStyles = {
	'purple-solid': classes['button--purple-solid'],
	purpleGradient: classes['button--purpleGradient'],
};
type ButtonStylesType = typeof ButtonStyles;

type Props = PropsWithChildren<{
	className?: string;
	style?: keyof ButtonStylesType;
	type?: 'submit' | 'reset' | 'button';
	onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

const Button: FC<Props> = ({ children, className = '', onClick, style }) => {
	return (
		<button
			onClick={onClick}
			className={`${classes.button} ${style ? ButtonStyles[style] : ''} ${className}`}>
			{children}
		</button>
	);
};

export default Button;
