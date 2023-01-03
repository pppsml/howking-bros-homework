import { FC, PropsWithChildren, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer } from '@/components';

import classes from './MainLayout.module.scss';

type MainLayoutProps = {};

export const MainLayout: FC<MainLayoutProps> = () => {
	return (
		<div className={classes.layout}>
			<Header />
			<main className={classes.main__content}>
				<Suspense fallback={<h1>loading page...</h1>}>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</div>
	);
};

const containerSizes = {
	normal: classes['container--size--normal'],
	thin: classes['container--size--thin'],
};

type ContainerProps = PropsWithChildren<{
	size?: keyof typeof containerSizes;
}>;

export const Container: FC<ContainerProps> = ({ children, size = 'normal' }) => {
	return <div className={`${classes.container} ${containerSizes[size]}`}>{children}</div>;
};
