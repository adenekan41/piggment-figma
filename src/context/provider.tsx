/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";

/* --------------------------- Internal Dependencies -------------------------- */
import GradientContext from ".";
import {
	generateGradient,
	guidGenerator,
	generatepalette,
} from "../utils/index";

type Props = {
	children: any;
};
type State = {
	gradient: Array<object>;
	palette: Array<object>;
	route: string;
	snarkbars: Array<object>;
};

class DataProvider extends React.PureComponent<Props, State> {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			gradient: [],
			palette: [],
			route: "",
			snarkbars: [],
		};
	}

	gradient = (amount: number): any => {
		const newGradient = [...this.state.gradient];

		for (let i = 0; i < amount; i++) {
			newGradient.push({
				id: guidGenerator(),
				name: `#Gradient`,
				color: generateGradient(),
			});
		}

		this.setState({
			gradient: newGradient,
		});
	};

	clearGradient = () => this.setState({ gradient: [], palette: [] });

	loadpalettes = (amount: number): any => {
		const newPalette = [...this.state.palette];
		for (let i = 0; i < amount; i++) {
			newPalette.push(generatepalette());
		}
		this.setState({
			palette: newPalette,
		});
	};

	setSnarkbar = (
		alertMsg: string,
		type: string = "success",
		duration: number = 5000
	): any => {
		const id = guidGenerator();
		this.setState({
			snarkbars: [
				...this.state.snarkbars,
				{
					id,
					msg: alertMsg,
					type,
				},
			],
		});

		setTimeout(() => {
			this.removeSnarkbar(id);
		}, duration);
	};

	setRoute = (route: string): any => {
		this.setState({
			route,
		});
	};

	removeSnarkbar = (id: string): any => {
		interface Alert {
			id: string;
		}
		const filteredSnarkbars = this.state.snarkbars.filter(
			(alert: Alert) => alert.id !== id
		);
		this.setState({
			snarkbars: filteredSnarkbars,
		});
	};

	render() {
		const { children } = this.props;
		return (
			<GradientContext.Provider
				value={{
					state: this.state.gradient,
					palette: this.state.palette,
					snarkbars: this.state.snarkbars,
					route: this.state.route,
					setSnarkbar: this.setSnarkbar,
					setRoute: this.setRoute,
					removeSnarkbar: this.removeSnarkbar,
					loadpalettes: this.loadpalettes,
					loadGradients: this.gradient,
					clearGradient: this.clearGradient,
				}}>
				{children}
			</GradientContext.Provider>
		);
	}
}

export default DataProvider;
