import React from 'react';
import {BlockNumber} from 'parity-reactive-ui';
import styles from "../style.css";

export class App extends React.Component {
	render() {
		return (<div id="app">Current block:&nbsp;
			<BlockNumber value={parity.bonds.blockNumber}/>
		</div>);
	}
}
