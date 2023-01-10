import { FC, PropsWithChildren } from 'react';

import classes from './Flex.module.scss';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type JustifyContent =
	| 'center'
	| 'start'
	| 'end'
	| 'flex-start'
	| 'flex-end'
	| 'left    '
	| 'right'
	| 'baseline'
	| 'first baseline'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
	| 'stretch'
	| 'safe center';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

type Props = PropsWithChildren<{
	direction?: Direction;
	justify?: JustifyContent;
	items?: AlignItems;
	gap?: string | number;

	className?: string;
	as?: string;
}>;

const Flex: FC<Props> = ({
	children,
	justify = 'start',
	items = 'baseline',
	direction = 'row',
	gap,

	className,
	as = 'div',
}) => {
	const As = as as unknown as any;

	return (
		<As
			className={`${classes.flex} ${className ?? ''}`}
			style={{
				justifyContent: justify,
				alignItems: items,
				flexDirection: direction,
				gap: gap,
			}}>
			{children}
		</As>
	);
};
export default Flex;
