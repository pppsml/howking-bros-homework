import { ChangeEvent, ChangeEventHandler, FC, memo, useState } from 'react';

import classes from './Input.module.scss';

type Props = {
	className?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
};

const Input: FC<Props> = ({ className, placeholder, onChange, value, ...restProps }) => {
	const [stateValue, setStateValue] = useState<string>('');

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
		const newValue: string = event.target.value;

		if (!value) setStateValue(newValue);

		onChange && onChange(event, newValue);
	};

	return (
		<input
			placeholder={placeholder ?? 'Placeholder'}
			value={value ?? stateValue}
			className={`${classes.input} ${className ?? ''}`}
			onChange={changeHandler}
			{...restProps}
		/>
	);
};
export default memo(Input);
