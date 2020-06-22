import {share} from './share.js';
import {recover} from './recover.js';
/* Below is code for the landing page */

function Heading() {
	return(<div id='headingWrap'>
		<div id="heading1"></div><div id="heading2"></div>
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
		<div className="shareInputHelper">
		</div>
		<input type="text" id="shareNumInput" placeholder="enter number of shares here"></input>
		<div className="shareInputHelper">
		</div>
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
			let out = document.getElementById('share-outputContainer');
			out.classList.toggle('hide');
			out.classList.toggle('show');

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
	<ShareHeaderContainer id="shareHeaderContainer" share={this.state.share} />
	<div id="secretsubContainer">
	<input type="text" id="secretsub" onKeyDown={this.handleKey} placeholder="enter secret here"></input></div>
	<div id="share-outputContainer" className="hide">
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
			let number = document.getElementById('shareNum').value;
			if (event.charCode) {
				return;
			}
			if (!number) {
				props.clear();
				return;
			}
			if (!isNaN(number)) {
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

class SecOut extends React.Component {
	constructor(props) {
		super(props);
	  	this.state = {
			secret: props.sec,
			scrollUp: props.scrollUp,
			scrollDown: props.scrollDown,
			present: props.present,
		};
	}

	componentDidMount() {
		this.state.scrollUp();
	}

	render() {
	  return(<div id="output" className="showOutput">
	  <div className="close" onClick={this.state.scrollDown}></div>
	  <div id="presentedContainer">
	  <div id="present">
	  {this.state.present}
	  </div>
	  <div id="presentedSecret">
	  {this.state.secret}
	  </div>
	  </div>
	  </div>);
	}
}

class Recover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recover: "/Recover",
			query: "enter the number of shares",
			secret: "the recovered secret is:",
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
	};

	showOut = (secret) => {
		let newSec = <SecOut sec={secret} scrollUp={this.scrollUp} scrollDown={this.scrollDown} present={this.state.secret}/>;
		this.setState({
			out: newSec,
		}, () => { console.log(this.state.out) });
	};

	updateFields(event) {
		let index = event.target.id;
		let newArr = this.state.data.slice();
		if (newArr[index-2] == undefined)
			newArr[index] = "";
		newArr[index] = event.target.value;
		this.setState({data: newArr});
	};
	
	triggerRecovery = () => {
		/* call recovery function on input shares */
			let xs = [];
			let ys = [];
			if (this.state.data[0] == undefined)
				this.state.data.shift();
			for (let i = 0; i < this.state.data.length; i++) {
				// save xs component
				xs.push(this.state.data[i][0]);
				// save ys component
				ys.push(this.state.data[i].slice(2));
			}
			if (xs.length != this.state.fields.length || ys.length != this.state.fields.length) {
				console.log('yo');
				return;
	}
			let secret = recover(xs, ys);
			this.showOut(secret);
	};
	
	clearArray = () => {
		/* clear the field array */
		this.setState({
			fields: [],
		});
	};
	
	scrollUp = () => {
                console.log("scrolling");
                let element = document.getElementById("output");
                element.classList.toggle('scrollUp');
                element.classList.toggle('showOutput');
        };

	scrollDown = () => {
		let element = document.getElementById("output");
		element.classList.toggle('scrollDown');
		setTimeout(() => {
			this.setState({ out: undefined })
		}, 900);
	};

	cleanSecret = () => {
		this.setState({
			out: undefined,
		});
	};

	render() {
		return(<React.Fragment>
		<RecoverHeaderContainer recover={this.state.recover} onClick={this.grabFields}/>
		<ShareQueryContainer query={this.state.query} up={this.updateValue} func={() => { this.addItems(0,[]) }} clear={() => { this.clearArray() }}/>
		<div id="fieldContainer">
		{this.state.fields}
		<RecoverSecret name="Recover!" func={this.triggerRecovery}/>
		</div>
		<div id="outContainer">
		{this.state.out}
		</div>
		</React.Fragment>);
	}
}
