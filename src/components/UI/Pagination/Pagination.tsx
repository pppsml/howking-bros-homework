import { type } from 'os';
import { FC, PropsWithChildren } from 'react';

type PathProps = PropsWithChildren<{}>;

const Path: FC<PathProps> = ({}) => {
	return <div></div>;
};

type PaginationProps = PropsWithChildren<{}>;
type PaginationT = PaginationProps & {
	Path: typeof Path;
};

const Pagination: PaginationT = ({}) => {
	return <div></div>;
};

Pagination.Path = Path;

export default Pagination;
