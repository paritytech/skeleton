import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {BlockNumber, Account, AccountIcon, Balance, TransactionProgress, SignatureProgress} from 'parity-reactive-ui';
import {ReactiveSpan, ReactiveComponent, TextBond, ReactiveAnchor} from 'oo7-react';
import {Signature} from 'oo7-parity';
import {TransformBond, ReactiveBond, Bond} from 'oo7';
import styles from "../style.css";

class HashBond extends TextBond {}
HashBond.defaultProps = {
	floatingLabelText: 'Enter a hash to look up',
	invalidText: 'Invalid 32-byte hash',
	validator: v => v.startsWith('0x') && v.length == 66
}

//0x5617a14da2a0c210939da6eafb734e60906f64a504c3e107812668860a752dc6
//https://raw.githubusercontent.com/ethcore/dapp-assets/master/certifications/email-verification.svg
class GithubHintLookup extends React.Component {
	constructor() {
		super();
		this.query = new Bond;
	}
	render() {
		return (<div style={{border: '1px solid #ccc', backgroundColor: '#eee', margin: '2em', padding: '2em', borderRadius: '1em'}}>
			<h1 style={{textAlign: 'center'}}>GithubHint Lookup</h1>
			<HashBond bond={this.query}/>
			<span style={{marginRight: '2em'}}></span>
			<ReactiveAnchor
				href={this.query ? parity.bonds.githubhint.entries(this.query).map(v => v[0]) : ''}
				target='top'
			>{parity.bonds.githubhint.entries(this.query).map(v => v ? v[0] : null)}</ReactiveAnchor>
		</div>);
	}
}

class Hash extends ReactiveComponent {
	constructor() {
		super(['value', 'className', 'style']);
	}
	render() {
		let v = this.state.value;
		let d = typeof(v) === 'string' && v.startsWith('0x') && v.length >= 18 ?
			v.substr(0, 8) + '…' + v.substr(v.length - 4) :
			v;
		return (<span
			className={this.state.className}
			style={this.state.style}
			title={this.state.value}
			name={this.props.name}
		>{d}</span>);
	}
}
Hash.defaultProps = {
	className: '_hash'
}

class GithubHintSet extends React.Component {
	constructor() {
		super();
		this.state = { request: null };
	}
	onRequest(url, hash) {
		this.setState({ request: parity.bonds.githubhint.hintURL(hash, url).subscribe(r => console.log(JSON.stringify(r))) });
	}
	render() {
		return (<GithubHintSetInterior
			request={this.state.request || null}
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
			<TextBond
				bond={this.bonds.url}
				floatingLabelText='Enter a URL to register'
				invalidText='Not a URL'
				validator={u => { try { return new URL(u) && true; } catch (e) { return false; } }}
			/>
			<Hash value={this.bonds.hash} />
			<RaisedButton disabled={!this.bonds.hash.ready()} label='Register' onClick={_ => this.props.onRequest(this.bonds.url, this.bonds.hash)} />
			<TransactionProgress request={this.props.request} />
		</div>);
	}
}

const message = 'Take the money and spend it as you see fit';

class SignerState extends React.Component {
	constructor() { super(); this.state = {}; }
	onRequest() { this.setState({ request: new Signature(parity.api.eth.accounts().then(a => a[2]), message) }); }
	render() {
		return (<Signer
			request={this.state.request || null}
			onRequest={this.onRequest.bind(this)}
		/>);
	}
}

class Signer extends ReactiveComponent {
	constructor() { super(['request']); this.state = { request: null }; }
	render() {
		return (<div>
			<RaisedButton
				label='Sign'
				disabled={this.state.request && this.state.request.signerRequestId}
				onClick={this.props.onRequest}
			/>
			<SignatureProgress request={this.props.request} />
		</div>);
	}
}

export class App extends React.Component {
	render() {
		return (<div id="app">
			<SignerState />
			Current block: <BlockNumber value={parity.bonds.block.map(x => x.number)}/>
			<br/>
			Mined by: <AccountIcon address={parity.bonds.block.map(x => x.author)} style={{width: '32px'}}/>
			<br/>
			Balance of last miner: <Balance value={new TransformBond(parity.api.eth.getBalance, [parity.bonds.block.map(x => x.author)])}/>
			<GithubHintLookup />
			<GithubHintSet />
		</div>);
	}
}

window.Bond = Bond;
window.TransformBond = TransformBond;
