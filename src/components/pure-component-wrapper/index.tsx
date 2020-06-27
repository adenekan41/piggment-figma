/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { memo, ReactFragment, ReactChild, ReactPortal } from "react";

export interface LayoutProps {
	children:
		| ReactChild
		| ReactFragment
		| ReactPortal
		| boolean
		| null
		| undefined;
}

const PureComponent = (WrappedComponent) =>
	memo((props: LayoutProps) => <WrappedComponent {...props} />);

export default PureComponent;
