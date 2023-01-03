import { FC, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';

import classes from './Dropdown.module.scss';

type DropdownItemProps = PropsWithChildren<{}>;

// вспомогательные компоненты
const DropdownItem: FC<DropdownItemProps> = ({ children }) => {
	return <li className={classes.dropdown__item}>{children}</li>;
};

const DropdownList: FC<PropsWithChildren> = ({ children }) => {
	return <ul className={classes.dropdown__list}>{children}</ul>;
};

// типы Dropdown
type DropdownProps = PropsWithChildren<{
	content: ReactNode;
	className?: string;
}>;
type DropdownType = FC<DropdownProps> & {
	DropdownItem: typeof DropdownItem;
	DropdownList: typeof DropdownList;
};

const Dropdown: DropdownType = ({ className, content, children }) => {
	const [isActive, setActive] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// dropdown controls
	const openDropdown = () => {
		setActive(true);
	};
	const closeDropdown = () => {
		setActive(false);
	};
	const toggleDropdown = () => {
		isActive ? closeDropdown() : openDropdown();
	};
	const outsideClickHandler = (e: MouseEvent) => {
		const path = e.composedPath();
		if (!path.includes(dropdownRef.current!)) {
			closeDropdown();
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', outsideClickHandler);
		return () => {
			document.body.removeEventListener('click', outsideClickHandler);
		};
	}, []);

	return (
		<div
			ref={dropdownRef}
			className={`${classes.dropdown} ${isActive ? classes.dropdown__open : ''} ${
				className ?? ''
			}`}>
			<button className={classes.dropdown__toggle} onClick={toggleDropdown}>
				{content}
			</button>
			{children}
		</div>
	);
};

Dropdown.DropdownItem = DropdownItem;
Dropdown.DropdownList = DropdownList;

export default Dropdown;
