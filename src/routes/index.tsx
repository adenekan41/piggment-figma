/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { lazy, Suspense } from "react";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

/* -------------------------- Internal Dependencies ------------------------- */
import LogoPrimary from "../components/logo-primary";
import Home from "../pages/index";

/* ------------------------- Component Dependencies ------------------------- */
// const Home = lazy(() => import("../pages/index"));

/* ---------------------------- Routes PropTypes ---------------------------- */

const Routes = (props) => (
	<Wrapper>
		<main id='main'>
			<>HELLO</>
			<Home />
			{/* <Link to='/'>Home</Link> */}
			{/* <Suspense fallback={<LogoPrimary />}> */}
			{/* <Home /> */}
			{/* <Route exact path='/' component={Home} /> */}
			{/* </Suspense> */}
		</main>
	</Wrapper>
);

const Wrapper = styled.div`
	.fade-enter {
		opacity: 0.6;
	}

	.fade-enter.fade-enter-active {
		opacity: 1;
		transition: opacity 0.4s ease-in;
	}

	.fade-exit {
		opacity: 1;
	}

	.fade-exit.fade-exit-active {
		opacity: 0.6;
		transition: opacity 0.4s ease-in;
	}
`;

export default Routes;
