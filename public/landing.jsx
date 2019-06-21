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
			sub: "a byte-sized secret sharing scheme",
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

class Share extends React.Component {
	constructor(proper) {
		super(proper);
		this.state = {
			share: "S/hare",
		};
	}
	render() {
		return(<React.Fragment>
	<ShareHeaderContainer share={this.state.share}/>
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

class Recover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recover: "/Recover",
		};
	}
	render() {
		return(<React.Fragment>
		<RecoverHeaderContainer recover={this.state.recover}/>
		</React.Fragment>);
	}
}
