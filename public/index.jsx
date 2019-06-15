"use strict";

function pad(str) {
	let n = str.length % 8;
	if (n == 0)
		return str;
	let z = "0";
	let newStr = str + z.repeat((8 - n));
	return newStr+" "+newStr.length;
}

function encode_secret(secret) {
	let s = "";
	for (let i = 0; i < secret.length; i++) {
		let x = secret[i].charCodeAt(0).toString(2);
		alert(pad(x));
		let y = parseInt(x, 2);
		y = String.fromCharCode(y);
		alert(y);
		s += secret[i].charCodeAt(0).toString(2);
		alert(secret[i].charCodeAt(0).toString(2));

	}
	return s;
}

function displaySecret() {
	let secret = document.getElementById('secret').value;
	let display = document.getElementById('sec');

	let display2 = document.getElementById('secpad');

	let s = encode_secret(secret);
	
	display.textContent = s + " " + s.length;
	display2.textContent = pad(s);
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
		this.setState({title: 'hello',});
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
