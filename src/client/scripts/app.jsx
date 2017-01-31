import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {BlockNumber, Account, AccountIcon, Balance, TransactionProgress, SignatureProgress} from 'parity-reactive-ui';
import {Ra, Rspan, ReactiveComponent, TextBond, HashBond, URLBond, Hash} from 'oo7-react';
import {Signature} from 'oo7-parity';
import {TransformBond, ReactiveBond, Bond} from 'oo7';
import styles from "../style.css";

//0x5617a14da2a0c210939da6eafb734e60906f64a504c3e107812668860a752dc6
//https://raw.githubusercontent.com/ethcore/dapp-assets/master/certifications/email-verification.svg
class GithubHintLookup extends React.Component {
	constructor() {
		super();
		this.query = new Bond;
		window.ghhbond = this.query;
	}
	render() {
		return (<div style={{border: '1px solid #ccc', backgroundColor: '#eee', margin: '2em', padding: '2em', borderRadius: '1em'}}>
			<h1 style={{textAlign: 'center'}}>GithubHint Lookup</h1>
			<HashBond bond={this.query} />
			<span style={{marginRight: '2em'}}></span>
			<Ra
				href={this.query ? parity.bonds.githubhint.entries(this.query)[0] : ''}
				target='top'
			>{this.query ? parity.bonds.githubhint.entries(this.query)[0] : null}</Ra>
		</div>);
	}
}

class GithubHintSet extends React.Component {
	constructor() {
		super();
		this.state = { request: null };
	}
	onRequest(url, hash) {
		this.setState({ request: parity.bonds.githubhint.hintURL(hash, url) });
	}
	render() {
		return (<GithubHintSetInterior
			request={this.state.request}
			onRequest={this.onRequest.bind(this)}
		/>);
	}
}

class GithubHintSetInterior extends ReactiveComponent {
	constructor() {
		var u = new Bond;
		var h = parity.bonds.hashContent(u);
		super([], {url: u, hash: h});
	}
	render() {
		return (<div>
			<URLBond
				bond={this.bonds.url}
				floatingLabelText='Enter a URL to register'
			/>
			<Hash value={this.bonds.hash} />
			<RaisedButton
				disabled={!this.bonds.hash.ready()}
				label='Register'
				onClick={_ => this.props.onRequest(this.bonds.url, this.bonds.hash)}
			/>
			<TransactionProgress request={this.props.request} />
		</div>);
	}
}

const message = 'Take the money and spend it as you see fit';

class SignerState extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	onRequest() {
		this.setState({
			request: new Signature(parity.api.eth.accounts().then(a => a[2]), message)
		});
	}
	render() {
		return (<Signer
			request={this.state.request || null}
			onRequest={this.onRequest.bind(this)}
		/>);
	}
}

class Signer extends ReactiveComponent {
	constructor() {
		super(['request']);
		this.state = { request: null };
	}
	render() {
		return (
			<Checkbox
				label='I agree to all terms and conditions. Please accept my contribution.'
				checked={this.state.request && !!this.state.request.signed}
				disabled={this.state.request && !!this.state.request.requested}
				onCheck={ (_, c) => { if (c) this.props.onRequest(); } }
				iconStyle={{width: '4em', height: '4em'}}
				labelStyle={{fontSize: '3em', lineHeight: 'normal'}}
			/>
		);
	}
}

export class App extends React.Component {
	render() {
		return (<div id="app">
			<SignerState />
			Current block: <Rspan>{parity.bonds.blockNumber.map(n => '' + n)}</Rspan>
			<br/>
			Mined by: <AccountIcon address={parity.bonds.block.author} style={{width: '32px'}} />
			<br/>
			Balance of last miner: <Balance value={parity.bonds.balance(parity.bonds.block.author)} />
			<GithubHintLookup />
			<GithubHintSet />
		</div>);
	}
}

window.Bond = Bond;
window.TransformBond = TransformBond;
