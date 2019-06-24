import {share} from './share.js';
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
	return(<div class="button" onClick={SharePage}>
		{props.share}
	</div>);
}

function RecoverButton(props) {
	return(<div class="button" onClick={RecoverPage}>
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
		<div class="shareRecoverHeader">
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
	let secret = document.getElementById('secretsub').value;
	let shares = share(3,3, secret);
	return shares;
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
	<div class="shareRecoverHeader">
		{props.recover}
	</div>
	</React.Fragment>);
}

function RecoverHeaderContainer(props) {
	return(<React.Fragment>
	<div class="shareRecoverHeaderContainer">
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
	<ShareNum />
	</div>
	</React.Fragment>);
}

function generate_divs() {
	let n = document.getElementById('shareNum').value;
	//FIXME: be sure to parse inputs!!
	return parseInt(n, 10);
}

class Generated extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	let elements = ['one','two','three'];
	let items = [];

	for (let i = 0; i < elements.length; i++) {
		items.push(
			<Generate_Divs child={props.message}/>
		);
	}

	return(<React.Fragment>
	<Recover />
	<div>
	{items}
	</div>
	</React.Fragment>);
	}
}

class ShareNum extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "hey",
		};
		
		this.num = (event) => {
			if (event.charCode == 13) {
				let n = generate_divs();
				// FIXME: generate new divs
				this.setState({generated: <Generate_Divs child={this.state.message} />});
				console.log('setState called');
				/*this.setState({key: <Generate_Divs child={this.state.message}/>});*/

				/*ReactDOM.render(<Generated message={i+1} />, document.getElementById('root'));*/
			}
		}

	}


	render() {
		return(<React.Fragment>
		<input id="shareNum" onKeyPress={this.num}></input>
		</React.Fragment>);
	}
}

function Generate_Divs(props) {
	return(<React.Fragment>
	<div>{props.child}</div>
	</React.Fragment>);	
}

class Recover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recover: "/Recover",
			query: "enter the number of shares",
			message: "hey",
			divisors: [],
		};
	}
	render() {
		return(<React.Fragment>
		<RecoverHeaderContainer recover={this.state.recover}/>
		<ShareQueryContainer query={this.state.query}/>
		</React.Fragment>);
	}
}
