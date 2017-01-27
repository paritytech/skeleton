import React from 'react';
import {BlockNumber, Account, AccountIcon, Balance} from 'parity-reactive-ui';
import {Reactive, ReactiveComponent, BondedTextField, ReactiveAnchor} from 'oo7-react';
import {TransformBond, Bond} from 'oo7';
import styles from "../style.css";

//0x5617a14da2a0c210939da6eafb734e60906f64a504c3e107812668860a752dc6
class GithubHintLookup extends React.Component {
	constructor() {
		super();
		this.query = new Bond;
	}
	render() {
		return (<div style={{border: '1px solid #ccc', backgroundColor: '#eee', margin: '2em', padding: '2em', borderRadius: '1em'}}>
			<h1 style={{textAlign: 'center'}}>GithubHint Lookup</h1>
			<BondedTextField
				bond={this.query}
				validator={v => v.startsWith('0x') && v.length == 66}
				floatingLabelText='Enter a hash to look up'
				invalidText='Invalid 32-byte hash'
			/>
			<span style={{marginRight: '2em'}}></span>
			<ReactiveAnchor
				href={this.query ? parity.bonds.githubhint.entries(this.query).map(v => v[0]) : ''}
				target='top'
			>{parity.bonds.githubhint.entries(this.query).map(v => v ? v[0] : null)}</ReactiveAnchor>
		</div>);
	}
}

export class App extends React.Component {
	render() {
		return (<div id="app">
			Current block: <BlockNumber value={parity.bonds.block.map(x => x.number)}/>
			<br/>
			Mined by: <AccountIcon address={parity.bonds.block.map(x => x.author)}/>
			<br/>
			Balance of last miner: <Balance value={new TransformBond(parity.api.eth.getBalance, [parity.bonds.block.map(x => x.author)])}/>
			<br/>
			Your coinbase is: <AccountIcon address={parity.bonds.coinbase}/>
			<GithubHintLookup />
		</div>);
	}
}
