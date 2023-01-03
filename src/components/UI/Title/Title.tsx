import { FC, PropsWithChildren } from 'react';

import classes from './Title.module.scss';

type TitleSizesT = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = PropsWithChildren<{
	className?: string;
	as?: TitleSizesT;
}>;

const Title: FC<Props> = ({ children, className, as = 'h1' }) => {
	const Size: FC<Props> = as as unknown as FC<Props>;

	return <Size className={`${classes.title} ${className ?? ''}`}>{children}</Size>;
};
export default Title;
