import { FC, PropsWithChildren } from 'react';

import NavItem from './NavItem';

import classes from './Navigation.module.scss';

type Props = PropsWithChildren<{
	className?: string;
}>;
type NavigationType = FC<Props> & {
	NavItem: typeof NavItem;
};

const Navigation: NavigationType = ({ className, children }) => {
	return (
		<nav className={`${classes.navigation} ${className ?? ''}`}>
			<ul className={classes.navList}>{children}</ul>
		</nav>
	);
};

Navigation.NavItem = NavItem;

export default Navigation;
