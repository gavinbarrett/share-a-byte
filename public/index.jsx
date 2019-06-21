import {share} from './share.js';
"use strict";

function displaySecret() {
	let secret = document.getElementById('secret').value;
	let display = document.getElementById('sec');
	alert(secret);
	let a = share(3,3,secret);
	alert(a);
	let display2 = document.getElementById('secpad');
}

class Body extends React.Component {
	
writeTitle() {
	let message = "share-a-byte";
	let t = document.getElementById('t');
	let dynam = "";
	for(let i = 0; i < message.length; i++) {
		setTimeout(function() {
		dynam += message[i];
		t.textContent = "dynam";
		}, 2000);
	}
}
	
	constructor(props) {
		super(props);
		this.sub = (event) => {
			if (event.charCode == 13) {
				displaySecret();
			}
		}
	}

	render() {
		return(<React.Fragment>
		<div id='head'>
		<div id='t'>{this.title}</div>
		</div>
		<p id="sec"></p>
		<p id="secpad"></p>
		<input type="text" id="secret" onKeyPress={this.sub} placeholder="enter secret here"></input>
		</React.Fragment>);
	}
}

ReactDOM.render(
	<Body/>,
	document.getElementById('root')
);
