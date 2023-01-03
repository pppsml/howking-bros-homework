import { FC } from 'react';
import { Link } from 'react-router-dom';

import logoSrc from '@/assets/logo.png';

type Props = {};

const Logo: FC<Props> = (props) => {
	return (
		<Link to="/">
			<img alt="Логотип сайта SDAEM.BY" style={{ display: 'block' }} src={logoSrc} />
		</Link>
	);
};
export default Logo;
