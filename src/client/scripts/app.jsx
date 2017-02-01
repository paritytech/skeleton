import React from 'react';
import {Rspan, TextBond} from 'oo7-react';
import {Bond} from 'oo7';
import styles from "../style.css";

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond;
	}
	render() {
		return (
			<div>
				<TextBond bond={this.bond}/>
				<Rspan>{parity.bonds.registry.lookupAddress(this.bond, 'A')}</Rspan>
			</div>
		);
	}
}
