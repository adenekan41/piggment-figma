/* -------------------------------------------------------------------------- */
/*                             External Dependcies                            */
/* -------------------------------------------------------------------------- */
import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";

/* -------------------------- Internal Dependencies ------------------------- */
import PureComponent from "../pure-component-wrapper";
import GradientContext from "../../context";
import rgbToSrgb from "@fantasy-color/rgb-to-srgb";
// import Card from '.';

/* --------------------------- Image Dependencies --------------------------- */
import PureReload from "../../assets/icons/icon-refresh.svg";
import PureCircle from "../../assets/icons/icon-circle.svg";
import PureBox from "../../assets/icons/icon-box.svg";
import { rgbToHex, hexToRgb } from "../../utils/index";

/* --------------------------- GradientLayout PropTypes --------------------------- */

const GradientLayout = ({
	header,
	noRefresh = false,
	state,
	mode,
	palette = false,
}: {
	header: string;
	mode: string;
	noRefresh: Boolean;
	palette: Boolean;
	state: Array<object>;
}) => {
	const [layout, setLayout] = useState(false);
	const { clearGradient } = useContext(GradientContext);
	const onCreate = (color) => {
		const color1 = hexToRgb(rgbToHex(color, 1));
		const color2 = hexToRgb(rgbToHex(color, 0));

		const newColor = {
			color1: rgbToSrgb({
				red: color1.r,
				green: color1.g,
				blue: color1.b,
			}),
			color2: rgbToSrgb({
				red: color2.r,
				green: color2.g,
				blue: color2.b,
			}),
		};

		console.log(newColor);
		parent.postMessage(
			{ pluginMessage: { type: "create-rectangles", color: newColor } },
			"*"
		);
	};
	return (
		<>
			<CardWrapper className='d-md-flex d-block justify-content-between explore_more'>
				<h2>{header} </h2>
				<div className='d-flex mb-md-0 mb-3'>
					<button
						onClick={() => {
							setLayout(true);
						}}
						className={"mr-4 none-button"}
						type='button'
						aria-label='Circle Layout'>
						<img src={PureCircle} className={layout ? "active" : null} />
					</button>
					<button
						className={"mr-4 none-button"}
						onClick={() => {
							setLayout(false);
						}}
						type='button'
						aria-label='Box Layout'>
						<img src={PureBox} className={!layout ? "active" : null} />
					</button>

					{noRefresh && (
						<button
							onClick={() => clearGradient()}
							className={"none-button"}
							type='button'
							aria-label='Refresh'>
							<span className='pb-1'>
								<img src={PureReload} className='mr-1' />
								Refresh
							</span>
						</button>
					)}
				</div>
			</CardWrapper>
			<Grid className='grid'>
				{state &&
					state.map((bg_gradient: any, index) => (
						// <Card
						// 	data={bg_gradient}
						// 	key={bg_gradient.id}
						// 	mode={mode}
						// 	palette={
						// 		bg_gradient.colors && bg_gradient.colors.length > 0
						// 			? true
						// 			: palette
						// 	}
						// 	layout={layout ? 'circle' : null}
						// />
						<Card
							className='card'
							layout={layout}
							onClick={() => onCreate(bg_gradient.color)}>
							<div className='card-body'>
								<figure
									style={{
										background: bg_gradient.color,
									}}
								/>
								<article>
									<h4>
										{bg_gradient.name}
										{bg_gradient.id.split("").splice(0, 4)}
									</h4>
									<p className='hex__section'>
										<span>{rgbToHex(bg_gradient.color, 1)}</span>
										{" - "}
										<span>{rgbToHex(bg_gradient.color, 0)}</span>
									</p>
									<div
										className='small__colors'
										style={{
											background: `${rgbToHex(bg_gradient.color, 1)}`,
										}}
									/>
									<div
										className='small__colors'
										style={{
											background: `${rgbToHex(bg_gradient.color, 0)}`,
										}}
									/>
								</article>
							</div>
						</Card>
					))}
			</Grid>
		</>
	);
};

const CardWrapper = styled.nav`
	align-items: center;
	span {
		cursor: pointer;
		color: var(--accent);
		border-bottom: 2px solid var(--theme-primary);
		font-size: var(--font-sm);
		img {
			filter: sepia(0) !important;
			width: 12px;
		}
	}
	a {
		border: none;
		color: var(--accent);
		font-size: 15px !important;
		font-weight: 400;
		letter-spacing: 0px;
	}
	div {
		img {
			filter: sepia(1);
			width: 15px;
			cursor: pointer;
			&.active {
				filter: sepia(0);
			}
		}
	}

	h2 {
		font-weight: 600;
		font-size: var(--font-md);
		color: var(--black);
		margin-bottom: 1.4rem;
	}
`;
const Card = styled.div`
	border: none !important;
	box-shadow: 0 2px 15px #0d14420d;
	cursor: pointer;
	transition: all 0.4s ease;
	figure {
		min-height: 8em;
		border-radius: 8px;
		transition: all 0.4s ease;
		animation: fadeIn;
		animation-duration: 1s;
		${(props: any) =>
			props.layout &&
			css`
				animation: fadeIn;
				animation-duration: 1s;
				transition: all 0.4s ease;
				height: 9em;
				min-height: 9em;
				width: 9em;
				border-radius: 50% !important;
				margin: 1rem auto;
			`}
	}
	canvas {
		display: none;
	}
	&:hover {
		margin-top: -8px;
		figure {
			transform: scale(1.06);
		}
	}

	.small__colors {
		height: 0.6em;
		width: 0.6em;

		margin: 0 1.5px;
		border-radius: 50%;
		display: inline-block;
		transition: all 0.4s ease;
		&:hover {
			transform: scale(1.14);
		}
	}
	article {
		${(props: any) =>
			props.layout &&
			css`
				h4 {
					text-align: center;
				}
				p {
					text-align: center;
				}
			`}
		h4 {
			text-transform: capitalize;
			font-size: calc(var(--font-sm) + 1px);
			font-weight: 500;

			color: var(--black);
			white-space: nowrap;
		}
		p {
			font-size: calc(var(--font-sm) - 3px);
			white-space: nowrap;
			color: #989898;
		}
	}

	svg {
		width: 1.06em;
		fill: #9a9a9a;
	}
	.card-body {
		padding: 13px;
	}
`;
const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(11em, 1fr));
	grid-template-rows: 1fr;
	grid-column-gap: 10px;
	grid-row-gap: 10px;
`;

export default GradientLayout;
