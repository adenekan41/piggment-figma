/* --------------------------- External Dependency -------------------------- */
import React from 'react';

type State = {
	state: Array<object>;
	palette: Array<object>;
	route: string;
	snarkbars: Array<object>;
	setRoute: (route: string) => any;
	setSnarkbar: (alertMsg: string, type?: string, duration?: number) => any;
	removeSnarkbar: (id: string) => any;
	loadpalettes: (amount: number) => any;
	loadGradients: (amount: number) => any;
	clearGradient: () => any;
};

const GradientContext = React.createContext<State>({
	state: [],
	palette: [],
	snarkbars: [],
	route: '',
	setRoute: () => {},
	setSnarkbar: () => {},
	removeSnarkbar: () => {},
	loadpalettes: () => {},
	loadGradients: () => {},
	clearGradient: () => {},
});

export default GradientContext;
