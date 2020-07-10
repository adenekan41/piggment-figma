import React, { useContext } from 'react';
import GradientContext from '../../context/index';
import styled from 'styled-components';
import Logo from '../../assets/icons/logo_.svg';

const Navbar = () => {
	const { setRoute, route } = useContext(GradientContext);
	return (
		<NavbarWrapper>
			<img src={Logo} alt="Logo" />
			<div>
				<span
					role="button"
					className={`${(route === '' && 'active') || ''}`}
					onClick={() => setRoute('')}
				>
					Gradient
				</span>
				<span
					role="button"
					className={`${(route === '/palette' && 'active') || ''}`}
					onClick={() => setRoute('/palette')}
				>
					Palettes
				</span>
				{/* <span>
					<a href="https://piggment.co">
						Open App{' '}
						<svg
							width="24"
							height="24"
							xmlns="http://www.w3.org/2000/svg"
							fill-rule="evenodd"
							clip-rule="evenodd"
						>
							<path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
						</svg>
					</a>
				</span> */}
			</div>
		</NavbarWrapper>
	);
};
const NavbarWrapper = styled.nav`
	display: flex;
	background: var(--bg-white);
	justify-content: space-between;
	padding: 0.8rem 1.5rem;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	width: 100%;
	img {
		width: 100px;
	}
	span {
		font-size: var(--font-sm);
		margin-left: 1rem;
		color: var(--black);
		cursor: pointer;

		&.active {
			font-weight: 700;
			font-family: Poppins;
			color: var(--black);
		}
	}
`;
export default Navbar;
