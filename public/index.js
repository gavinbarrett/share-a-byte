"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pad(str) {
	var n = str.length % 8;
	if (n == 0) return str;
	var z = "0";
	var newStr = str + z.repeat(8 - n);
	return newStr + " " + newStr.length;
}

function encode_secret(secret) {
	var s = "";
	for (var i = 0; i < secret.length; i++) {
		var x = secret[i].charCodeAt(0).toString(2);
		alert(pad(x));
		var y = parseInt(x, 2);
		y = String.fromCharCode(y);
		alert(y);
		s += secret[i].charCodeAt(0).toString(2);
		alert(secret[i].charCodeAt(0).toString(2));
	}
	return s;
}

function displaySecret() {
	var secret = document.getElementById('secret').value;
	var display = document.getElementById('sec');

	var display2 = document.getElementById('secpad');

	var s = encode_secret(secret);

	display.textContent = s + " " + s.length;
	display2.textContent = pad(s);
}

var Body = function (_React$Component) {
	_inherits(Body, _React$Component);

	_createClass(Body, [{
		key: "writeTitle",
		value: function writeTitle() {
			var message = "share-a-byte";
			var t = document.getElementById('t');
			var dynam = "";

			var _loop = function _loop(i) {
				setTimeout(function () {
					dynam += message[i];
					t.textContent = "dynam";
				}, 2000);
			};

			for (var i = 0; i < message.length; i++) {
				_loop(i);
			}
		}
	}]);

	function Body(props) {
		_classCallCheck(this, Body);

		var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

		_this.setState({ title: 'hello' });
		_this.sub = function (event) {
			if (event.charCode == 13) {
				displaySecret();
			}
		};
		return _this;
	}

	_createClass(Body, [{
		key: "render",
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(
					"div",
					{ id: "head" },
					React.createElement(
						"div",
						{ id: "t" },
						this.title
					)
				),
				React.createElement("p", { id: "sec" }),
				React.createElement("p", { id: "secpad" }),
				React.createElement("input", { type: "text", id: "secret", onKeyPress: this.sub, placeholder: "enter secret here" })
			);
		}
	}]);

	return Body;
}(React.Component);

ReactDOM.render(React.createElement(Body, null), document.getElementById('root'));