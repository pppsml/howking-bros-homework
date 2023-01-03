import { FC, PropsWithChildren } from 'react';

import classes from './NavItem.module.scss';

type Props = PropsWithChildren<{
	className?: string;
}>;

const NavItem: FC<Props> = ({ children, className }) => {
	return <li className={`${classes.navItem} ${className ?? ''}`}>{children}</li>;
};

export default NavItem;
