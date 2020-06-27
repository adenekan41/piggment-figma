/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useContext, Suspense, lazy } from "react";

/* -------------------------- Internal Dependencies ------------------------- */
import GradientContext from "../context/index";

/* ------------------------- Component Dependencies ------------------------- */
import Home from "../pages/index";
import Palettes from "../pages/palettes";

/* --------------------------- Image Dependencies --------------------------- */
import LogoPrimary from "../components/logo-primary";
import Navbar from "../components/navbar/index";

const router = () => {
	const { route } = useContext(GradientContext);
	switch (route) {
		case "":
			return <Home />;
		case "/palette":
			return <Palettes />;
	}
};

export default function Main() {
	return (
		<div className='bg-main'>
			<Navbar />
			<Suspense fallback={<LogoPrimary />}> {router()}</Suspense>
		</div>
	);
}
