import { FC, SVGProps } from 'react';

import classes from './Icon.module.scss';

type Props = SVGProps<SVGSVGElement> & {
	className?: string;
	color?: string;
};

const icon: FC<Props> = ({ color, className, ...restProps }) => {
	return (
		<svg className={`${classes.icon} ${className ?? ''}`} {...restProps} viewBox="0 0 10 19">
			<path
				d="M7.88394 3.79773H9.44256V1.08311C9.17366 1.04612 8.24887 0.962891 7.17185 0.962891C4.92461 0.962891 3.38519 2.3764 3.38519 4.97434V7.36528H0.905334V10.4H3.38519V18.0359H6.42561V10.4007H8.80517L9.18291 7.36599H6.4249V5.27525C6.42562 4.39813 6.66179 3.79773 7.88394 3.79773Z"
				fill={color}
			/>
		</svg>
	);
};
export default icon;
