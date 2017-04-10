import React from 'react';
import {Rspan, TextBond, ReactiveComponent} from 'oo7-react';
import {Bond, TimeBond} from 'oo7';
import styles from "../style.css";

class Block extends ReactiveComponent {
	constructor() {
		super(['json']);
	}
	readyRender() {
		return (<div>Author: {this.state.json && this.state.json.author}</div>);
	}
}

class Sub extends ReactiveComponent {
	constructor() {
		super(['height']);
	}
	readyRender() {
		return (<Block json={parity.bonds.blocks[this.state.height]} />);
	}
}

class BN extends React.Component {
	render() {
		return (<Rspan>{parity.bonds.height}</Rspan>);
	}
}

export class App extends ReactiveComponent {
	constructor () {
		let bond = new Bond;
		super([], {bond});
		this.bond = bond;
	}
	render() {
		return (<div>
			<TextBond bond={this.bond}/>
			{this.state.bond !== '' ? (<BN/>) : ''}
		</div>);
	}
}
