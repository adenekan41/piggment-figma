/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import GradientContext from "../context/index";
import GradientLayout from "../components/card/card-container";
import { debounce } from "../utils/index";

const Home = () => {
	const { state, loadGradients } = useContext(GradientContext);

	useEffect(() => {
		if (state.length < 7) {
			loadGradients(7);
		}
	}, [loadGradients, state]);

	return (
		<>
			<Header>
				<article className='container'>
					<h1>Explore fresh gradients.</h1>
					<p>
						Generate, explore, easy CSS copy crossbrowser code all in one place.
					</p>
				</article>
			</Header>
			<Section className='container'>
				<GradientLayout
					header='Discover'
					state={state}
					noRefresh
					mode='see-more'
				/>
				<button className='btn btn-piggment' onClick={() => loadGradients(5)}>
					Load More
				</button>
			</Section>
		</>
	);
};
const Header = styled.header`
	background: #fff8f0;
	min-height: 11em;
	align-items: center;
	justify-content: flex-start;
	background-size: calc(20 * 0.5px) calc(20 * 0.5px);
	background-image: radial-gradient(#0a113e47 0.5px, transparent 0.5px);
	display: flex;
	h1 {
		font-weight: 900;
		font-size: calc(var(--font-md) + 6.1px);
		text-align: left;
		color: var(--black);
		margin: 0px 0 15px;
	}
	p {
		color: #717171;
		margin: 6px 0;
		font-size: calc(var(--font-sm) - 0.4px);
		font-weight: 400;
	}
`;
const Section = styled.section`
	margin-top: 2rem;

	.w-70 {
		width: 70px;
	}

	.more__cards {
		margin-top: 4rem !important;
		p {
			color: #717171;
			font-size: 16px;
			font-weight: 400;
		}
		a {
			padding: 12px 40px;
			border: none;
			font-size: var(--font-sm);

			font-weight: 500;
		}
	}
	button.btn-piggment {
		display: block;
		margin: 2rem auto 0;
		font-size: 12px;
		padding: 6px 40px;
	}
`;
export default Home;
