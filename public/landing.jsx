import {share} from './share.js';
import {recover} from './recover.js';

/* Below is code for the landing page */

function Heading() {
	return(<div id='heading'>
	</div>);
}

function Subheader(props) {
	return(<div id="subheader">
		{props.sub}
	</div>);
}

function HeadingContainer(props) {
	return(<div id="headingContainer">
	<Heading />
	<Subheader sub={props.sub} />
	</div>);
}

function ShareButton(props) {
	return(<div className="button" onClick={SharePage}>
		{props.share}
	</div>);
}

function RecoverButton(props) {
	return(<div className="button" onClick={RecoverPage}>
		{props.recover}
	</div>);
}

function SelectionBox(props) {
	return(<React.Fragment>
	<div id="selectionBox">
	<ShareButton share={props.share}/>
	<RecoverButton recover={props.recover}/>
	</div>
	</React.Fragment>);
}

function SelectionBoxContainer(props) {
	return(<React.Fragment>
	<div id="selectionBoxContainer">
	<SelectionBox share={props.share} recover={props.recover}/>
	</div>
	</React.Fragment>);
}

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sub: "a byte-sized secret sharing solution",
			share: "share a secret",
			recover: "recover a secret",
		};
	}

	render() {
	return(<React.Fragment>
	<HeadingContainer sub={this.state.sub}/>
	<SelectionBoxContainer share={this.state.share} recover={this.state.recover}/>
	</React.Fragment>);}
}

ReactDOM.render(
	<LandingPage/>,
	document.getElementById('root')
);


/*
 *
 * Below is code for the Sharing page
 *
 * */

function SharePage() {
	ReactDOM.render(<Share />, document.getElementById('root'));
}

function ShareHeader(props) {
	return(<React.Fragment>
		<div className="shareRecoverHeader">
		{props.share}
		</div>
	</React.Fragment>);
}

function ShareHeaderContainer(props) {
	return(<React.Fragment>
		<div class="shareRecoverHeaderContainer">
		<ShareHeader share={props.share}/>
		</div>
	</React.Fragment>);
}

function shareSecret() {
	/* Call the share function */
	/* FIXME parse inputs and return any appropriate error messages */
	let secret = document.getElementById('secretsub').value;
	let n = document.getElementById('shareNumInput').value;
	let t = document.getElementById('threshold').value;
	return share(n,t, secret);
}

class Share extends React.Component {
	constructor(proper) {
		super(proper);
		this.state = {
			share: "S/hare",
		};
		this.sub = (event) => {
			if (event.charCode == 13) {
				let n = document.getElementById('shareNumInput');
				let t = document.getElementById('threshold');
				if (!n || !t) {
					alert('please add proper fields');
					return;
				}
				let shares = shareSecret();
				let out = document.getElementById('share-output');
				console.log(shares);
				out.textContent = shares;
			}
		}
	}
	render() {
	return(<React.Fragment>
	<ShareHeaderContainer share={this.state.share}/>
	<div id="secretsubContainer">
	<input type="text" id="shareNumInput" placeholder="enter number of shares here"></input>
	<input type="text" id="threshold" placeholder="enter the threshold here"></input>
	<input type="text" id="secretsub" onKeyPress={this.sub} placeholder="enter secret here"></input></div>
	<div id="share-output">
	</div>
	</React.Fragment>);
	}
}


/*
 *
 * Below is the code for the Recovery page
 *
 * */

function RecoverPage() {
	ReactDOM.render(<Recover />, document.getElementById('root'));
}

function RecoverHeader(props) {
	return(<React.Fragment>
	<div className="shareRecoverHeader">
		{props.recover}
	</div>
	</React.Fragment>);
}

function RecoverHeaderContainer(props) {
	return(<React.Fragment>
	<div className="shareRecoverHeaderContainer">
	<RecoverHeader recover={props.recover}/>
	</div>
	</React.Fragment>);
}

function ShareQuery(props) {
	return(<React.Fragment>
	<div id="shareQuery">{props.query}</div>
	</React.Fragment>);
}

function ShareQueryContainer(props) {
	return(<React.Fragment>
	<div id="shareQueryContainer">
	<ShareQuery query={props.query} />
	<ShareNum up={props.up} func={props.func} clear={props.clear} />
	</div>
	</React.Fragment>);
}

function generate_divs() {
	let n = document.getElementById('shareNum').value;
	//FIXME: be sure to parse inputs!!
	return parseInt(n, 10);
}

class ShareNum extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "hey",
		};

		this.num = (event) => {
			let x = document.getElementById('shareNum').value;
			if (!x || event.charCode) {
				return;
			}
			if (!isNaN(x) && x != "") {
				props.clear();
				props.func(0, []);
			}
		}
	}

	render() {
		return(<React.Fragment>
		<input id="shareNum" onKeyUp={this.num.bind(this)}></input>
		</React.Fragment>);
	}
}

function Node(props) {
	return(<div className="field">
	<input type="text" id={props.k} className="inputField" placeholder="enter your share here" onKeyUp={props.grabFields} key={props.key}></input>
	</div>);
}

function RecoverSecret(props) {
	return(<div id="recoverButtonWrapper">
	<button id="recoverButton" onClick={props.func}>{props.name}</button>
	</div>);
}

function Output(props) {
	return(<div id="output">
	</div>);
}

class Recover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recover: "/Recover",
			query: "enter the number of shares",
			message: "hey",
			fields: [],
			data: [],
		};
		this.updateValue = this.updateValue.bind(this);
		this.clearArray = this.clearArray.bind(this);
		this.addItems = this.addItems.bind(this);
		this.grabFields = this.grabFields.bind(this);
	}

	addItems(i,a) {
		let n = document.getElementById('shareNum').value;
		if (i == n) {
			this.setState((state,props) => ({
				fields: a,
			}));
			return;
		}
		i++;
		let s = "Share " + i;
		a.push(<Node grabFields={this.grabFields} key={i} k={i} value={s}/>);
		setTimeout(this.addItems(i, a), 100);
	}

	updateValue(event) {
		this.setState({data: event});
		/*alert(event);*/
	}

	grabFields(event) {
		let index = event.target.id;
		const newArr = [
			...this.state.data.slice(0, index-1),
			event.target.value,
			...this.state.data.slice(index + 1),
		];
		this.setState({data: newArr});
	}

	triggerRecovery() {
		/* Call recovery function on input shares */

			let xs = [];
			let ys = [];
			for (let i = 0; i < this.state.data.length; i++) {
				console.log(this.state.data[i]);
				// save xs component
				xs.push(this.state.data[i][0]);
				// save ys component
				/*let y = this.state.data[i].slice(2);
				alert(y);*/
				ys.push(this.state.data[i].slice(2));
			}
			let secret = recover(xs, ys);

			let out = document.getElementById('output');
			out.textContent = secret;
	}

	clearArray = () => {
		this.setState({
			fields: [],
		}, (console.log(this.state.fields)));
	};

	render() {
		return(<React.Fragment>
		<RecoverHeaderContainer recover={this.state.recover} onClick={this.grabFields}/>
		<ShareQueryContainer query={this.state.query} up={this.updateValue} func={() => { this.addItems(0,[]) }} clear={() => { this.clearArray() }}/>
		<div id="fieldContainer:">
		{this.state.fields}
		<RecoverSecret name="Recover Secret" func={this.triggerRecovery.bind(this)}/>
		<Output />
		</div>
		</React.Fragment>);
	}
}
