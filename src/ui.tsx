import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/styles/index.css";
import DataProvider from "./context/provider";
import Main from "./routes/main";

class App extends React.Component {
	render() {
		return <Main />;
	}
}

ReactDOM.render(
	<DataProvider>
		<App />
	</DataProvider>,

	document.getElementById("react-page")
);
