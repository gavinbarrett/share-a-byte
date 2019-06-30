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
		<div className="shareRecoverHeaderContainer">
		<ShareHeader share={props.share}/>
		<input type="text" id="shareNumInput" placeholder="enter number of shares here"></input>
		<input type="text" id="threshold" placeholder="enter the threshold here"></input>
		</div>
	</React.Fragment>);
}

function shareSecret() {
	/* Call the share function */
	/* FIXME parse inputs and return any appropriate error messages */
	let secret = document.getElementById('secretsub').value;
	let n = document.getElementById('shareNumInput').value;
	let t = document.getElementById('threshold').value;
	return share(n, t, secret);
}

function ShareBox(props) {
		return(<div className="shareBoxContainer">
		<textarea className="shareBox" key={props.key}>{props.num + " " + props.share}</textarea>
		</div>);
}

class Share extends React.Component {
	constructor(proper) {
		super(proper);
		this.state = {
			share: "S/hare",
			shareArr: [],
			index: 0,
		};
		this.clearShareArray = this.clearShareArray.bind(this);
	}

		sub = () => {
				console.log('subbing');
				let n = document.getElementById('shareNumInput');
				let t = document.getElementById('threshold');
				if (!n || !t) {
					alert('please add proper fields');
					return;
				}
				let shares = shareSecret();
				this.outputShares(shares);
		};

		outputShares = (shares) => {
			/* output shares to the screen */
			let newShareArr = [];
			let idx = this.state.index;
			for (let i = 0; i < shares.length; i++) {
						if (newShareArr[i] == undefined)
								newShareArr[i] = "";
						newShareArr[i] = (<ShareBox num={i+1} key={idx} share={shares[i]}/>);
						idx += 1;
			}
			this.setState({shareArr: newShareArr, index: idx}, () => {console.log(this.state.shareArr)});
		};

		clearShareArray = () => {
				/* clear array of shares */
				console.log('clearing...');
				this.setState({
					shareArr: [],
				}, () => { console.log(this.state.shareArr) });
		};

		handleKey = (event) => {
				if (event.keyCode == 13) {
					this.clearShareArray();
					this.sub();
				}
		};

	render() {
	return(<React.Fragment>
	<ShareHeaderContainer share={this.state.share}/>
	<div id="secretsubContainer">
	<input type="text" id="secretsub" onKeyDown={this.handleKey} placeholder="enter secret here"></input></div>
	<div id="share-outputContainer">
	<div id="share-output">
	{this.state.shareArr}
	</div>
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
		this.num = (event) => {
			let x = document.getElementById('shareNum').value;
			if (event.charCode) {
				return;
			}
			if (!x) {
				props.clear();
				return;
			}
			if (!isNaN(x) /*&& x != ""*/) {
				props.clear();
				props.func(0, []);
			}
		}
	}

	render() {
		return(<React.Fragment>
		<input id="shareNum" onKeyUp={this.num}></input>
		</React.Fragment>);
	}
}

function Node(props) {
	return(<div className="field">
	<input type="text" id={props.k} className="inputField" placeholder="enter your share here" onChange={props.grabFields} key={props.key}></input>
	</div>);
}

function RecoverSecret(props) {
	return(<div id="recoverButtonWrapper">
	<button id="recoverButton" onClick={props.func}>{props.name}</button>
	</div>);
}

function Output(props) {
	return(<div id="secout">
	</div>);
}

function SecOut(props) {
	return(<div id="output">
	{props.sec}
	</div>);
}

class Recover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recover: "/Recover",
			query: "enter the number of shares",
			fields: [],
			data: [],
			out: undefined,
		};
		this.clearArray = this.clearArray.bind(this);
		this.addItems = this.addItems.bind(this);
		this.updateFields = this.updateFields.bind(this);
	}

	addItems(index, array) {
		let thresh = document.getElementById('shareNum').value;
		if (index == thresh) {
			this.setState((state,props) => ({
				fields: array,
			}));
			return;
		}
		index++;
		array.push(<Node grabFields={this.updateFields} key={index} k={index}/>);
		this.addItems(index, array);
	}

	showOut = (secret) => {
		this.setState({
			out: <SecOut sec={secret}/>,
		});
	};

	updateFields(event) {
		let index = event.target.id;
		let newArr = this.state.data.slice();
		if (newArr[index-2] == undefined)
			newArr[index] = "";
		newArr[index] = event.target.value;
		this.setState({data: newArr});
	}

	triggerRecovery = () => {
		/* call recovery function on input shares */
			let xs = [];
			let ys = [];
			this.state.data.shift();
			for (let i = 0; i < this.state.data.length; i++) {
				// save xs component
				xs.push(this.state.data[i][0]);
				// save ys component
				ys.push(this.state.data[i].slice(2));
			}
			let secret = recover(xs, ys);
			this.showOut(secret);
			/*let out = document.getElementById('output');
			out.textContent = secret;*/
	}

	clearArray = () => {
		/* clear the field array */
		this.setState({
			fields: [],
		});
	};

	render() {
		return(<React.Fragment>
		<RecoverHeaderContainer recover={this.state.recover} onClick={this.grabFields}/>
		<ShareQueryContainer query={this.state.query} up={this.updateValue} func={() => { this.addItems(0,[]) }} clear={() => { this.clearArray() }}/>
		<div id="fieldContainer">
		{this.state.fields}
		<RecoverSecret name="Recover!" func={this.triggerRecovery}/>
		<Output />
		{this.state.out}
		</div>
		</React.Fragment>);
	}
}
