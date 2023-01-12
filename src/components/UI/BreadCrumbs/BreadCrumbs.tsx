import { FC, PropsWithChildren, ReactNode } from 'react';

import { Link, Flex } from '@/components';
import { HomeIcon } from '@/components/UI/icons';

import classes from './BreadCrumbs.module.scss';

const Home: FC = ({}) => {
	return (
		<Link href="/">
			<HomeIcon />
		</Link>
	);
};

const Separator: FC = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4">
			<circle cx="1.5" cy="2" r="1.5" fill="currentColor" />
		</svg>
	);
};

const BreadCrumbsLink: FC<
	PropsWithChildren<{
		href: string;
	}>
> = ({ children, href }) => {
	return (
		<Link className={classes.link} href={href}>
			{children}
		</Link>
	);
};

const Text: FC<PropsWithChildren<{}>> = ({ children }) => {
	return <span className={classes.text}>{children}</span>;
};

const Colors = {
	purple: classes['color--purple'],
};

type BreadCrumbsProps = {
	items: ReactNode[];
	color?: keyof typeof Colors;
};

type BreadCrumbs = FC<BreadCrumbsProps> & {
	Home: typeof Home;
	Link: typeof BreadCrumbsLink;
	Text: typeof Text;
};

const BreadCrumbs: BreadCrumbs = ({ items, color = 'purple' }) => {
	return (
		<Flex gap={7} items="center" className={Colors[color]}>
			{items.map((item, index) => (
				<>
					{index !== 0 ? <Separator /> : null}
					{item}
				</>
			))}
		</Flex>
	);
};

BreadCrumbs.Home = Home;
BreadCrumbs.Link = BreadCrumbsLink;
BreadCrumbs.Text = Text;

export default BreadCrumbs;
