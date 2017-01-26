import React from 'react';
import {BlockNumber, Account, AccountIcon, Balance} from 'parity-reactive-ui';
import {Reactive} from 'oo7-react';
import {TransformBond} from 'oo7';
import styles from "../style.css";

export class App extends React.Component {
	render() {
		return (<div id="app">
			Current block: <BlockNumber value={parity.bonds.block.map(x => x.number)}/>
			<br/>
			Mined by: <AccountIcon address={parity.bonds.block.map(x => x.author)}/>
			<br/>
			Balance of last miner: <Reactive value={new TransformBond(parity.api.eth.getBalance, [parity.bonds.block.map(x => x.author)]).map(n => ''+n)}/>
			<br/>
			Your coinbase is: <AccountIcon address={parity.bonds.coinbase}/>
		</div>);
	}
}
