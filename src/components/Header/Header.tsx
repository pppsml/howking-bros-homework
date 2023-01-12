import { FC, ReactNode } from 'react';

import { Container } from '@/templates';
import { Logo, Link, Dropdown, Button } from '@/components';
import { HeartIcon } from '@/components/UI/icons';
import MapMarkerIcon from '@/components/UI/icons/MapMarker';
import Navigation from './Navigation';

import classes from './Header.module.scss';

type Props = {};

const headerTopNavItems: { content: ReactNode | string; href: string }[] = [
	{
		content: 'Главная',
		href: '/',
	},
	{
		content: 'Новости',
		href: '/news',
	},
	{
		content: 'Размещение и тарифы',
		href: '/',
	},
	{
		content: (
			<>
				<MapMarkerIcon />
				<span>Объявления на карте</span>
			</>
		),
		href: '/',
	},
	{
		content: 'Контакты',
		href: '/',
	},
];

const dropdownItems: { text: string; href: string }[] = [
	{
		text: 'Квартиры на сутки в Минске',
		href: '/',
	},
	{
		text: 'Квартиры на сутки в Гомеле',
		href: '/',
	},
	{
		text: 'Квартиры на сутки в Бресте',
		href: '/',
	},
	{
		text: 'Квартиры на сутки в Витебске',
		href: '/',
	},
	{
		text: 'Квартиры на сутки в Гродно',
		href: '/',
	},
	{
		text: 'Квартиры на сутки в Могилеве',
		href: '/',
	},
];

const Header: FC<Props> = (props) => {
	return (
		<header className={classes.header}>
			<div className={classes['header--top']}>
				<Container>
					<div className={classes['header--top__inner']}>
						<Navigation>
							{headerTopNavItems.map(({ content, href }) => (
								<Navigation.NavItem key={`${content}-${href}`}>
									<Link style="underline" href={href}>
										{content}
									</Link>
								</Navigation.NavItem>
							))}
						</Navigation>
						<Navigation>
							<Navigation.NavItem>
								<Link style="underline" href="/">
									<span>Закладки</span>
									<HeartIcon />
								</Link>
							</Navigation.NavItem>
							<Navigation.NavItem>
								<Link style="underline" href="/registration">
									<p className={classes['link--registation']}>Вход и регистрация</p>
								</Link>
							</Navigation.NavItem>
						</Navigation>
					</div>
				</Container>
			</div>
			<div className={classes['header--bottom']}>
				<Container>
					<div className={classes['header--bottom__inner']}>
						<Logo />
						<Navigation className={classes['header--bottom__nav']}>
							<Navigation.NavItem>
								<Dropdown
									className={classes['header--bottom__link']}
									content={
										<Link style="underline" href="#" className={classes['header--bottom__link']}>
											<span>Квартиры на сутки</span>
											<MapMarkerIcon className={classes['header--bottom__link--icon']} />
										</Link>
									}>
									<Dropdown.DropdownList>
										{dropdownItems.map(({ text, href }) => (
											<Dropdown.DropdownItem key={`${text}-${href}`}>
												<Link style="underline" href={href}>
													{text}
												</Link>
											</Dropdown.DropdownItem>
										))}
									</Dropdown.DropdownList>
								</Dropdown>
							</Navigation.NavItem>
							<Navigation.NavItem className={classes['header--bottom__link']}>
								<Link style="underline" href="/">
									Коттеджи и усадьбы
								</Link>
							</Navigation.NavItem>
							<Navigation.NavItem className={classes['header--bottom__link']}>
								<Link style="underline" href="/">
									Бани и сауны
								</Link>
							</Navigation.NavItem>
							<Navigation.NavItem className={classes['header--bottom__link']}>
								<Link style="underline" href="/">
									Авто прокат
								</Link>
							</Navigation.NavItem>
						</Navigation>
						<Button style="purpleGradient">+ Разместить объявление</Button>
					</div>
				</Container>
			</div>
		</header>
	);
};

export default Header;
