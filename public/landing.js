var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { share } from './share.js';
import { recover } from './recover.js';

/* Below is code for the landing page */

function Heading() {
	return React.createElement('div', { id: 'heading' });
}

function Subheader(props) {
	return React.createElement(
		'div',
		{ id: 'subheader' },
		props.sub
	);
}

function HeadingContainer(props) {
	return React.createElement(
		'div',
		{ id: 'headingContainer' },
		React.createElement(Heading, null),
		React.createElement(Subheader, { sub: props.sub })
	);
}

function ShareButton(props) {
	return React.createElement(
		'div',
		{ className: 'button', onClick: SharePage },
		props.share
	);
}

function RecoverButton(props) {
	return React.createElement(
		'div',
		{ className: 'button', onClick: RecoverPage },
		props.recover
	);
}

function SelectionBox(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ id: 'selectionBox' },
			React.createElement(ShareButton, { share: props.share }),
			React.createElement(RecoverButton, { recover: props.recover })
		)
	);
}

function SelectionBoxContainer(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ id: 'selectionBoxContainer' },
			React.createElement(SelectionBox, { share: props.share, recover: props.recover })
		)
	);
}

var LandingPage = function (_React$Component) {
	_inherits(LandingPage, _React$Component);

	function LandingPage(props) {
		_classCallCheck(this, LandingPage);

		var _this = _possibleConstructorReturn(this, (LandingPage.__proto__ || Object.getPrototypeOf(LandingPage)).call(this, props));

		_this.state = {
			sub: "a byte-sized secret sharing solution",
			share: "share a secret",
			recover: "recover a secret"
		};
		return _this;
	}

	_createClass(LandingPage, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(HeadingContainer, { sub: this.state.sub }),
				React.createElement(SelectionBoxContainer, { share: this.state.share, recover: this.state.recover })
			);
		}
	}]);

	return LandingPage;
}(React.Component);

ReactDOM.render(React.createElement(LandingPage, null), document.getElementById('root'));

/*
 *
 * Below is code for the Sharing page
 *
 * */

function SharePage() {
	ReactDOM.render(React.createElement(Share, null), document.getElementById('root'));
}

function ShareHeader(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ className: 'shareRecoverHeader' },
			props.share
		)
	);
}

function ShareHeaderContainer(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ 'class': 'shareRecoverHeaderContainer' },
			React.createElement(ShareHeader, { share: props.share })
		)
	);
}

function shareSecret() {
	/* Call the share function */
	/* FIXME parse inputs and return any appropriate error messages */
	var secret = document.getElementById('secretsub').value;
	var n = document.getElementById('shareNumInput').value;
	var t = document.getElementById('threshold').value;
	return share(n, t, secret);
}

var Share = function (_React$Component2) {
	_inherits(Share, _React$Component2);

	function Share(proper) {
		_classCallCheck(this, Share);

		var _this2 = _possibleConstructorReturn(this, (Share.__proto__ || Object.getPrototypeOf(Share)).call(this, proper));

		_this2.state = {
			share: "S/hare"
		};
		_this2.sub = function (event) {
			if (event.charCode == 13) {
				var n = document.getElementById('shareNumInput');
				var t = document.getElementById('threshold');
				if (!n || !t) {
					alert('please add proper fields');
					return;
				}
				var shares = shareSecret();
				var out = document.getElementById('share-output');
				console.log(shares);
				out.textContent = shares;
			}
		};
		return _this2;
	}

	_createClass(Share, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(ShareHeaderContainer, { share: this.state.share }),
				React.createElement(
					'div',
					{ id: 'secretsubContainer' },
					React.createElement('input', { type: 'text', id: 'shareNumInput', placeholder: 'enter number of shares here' }),
					React.createElement('input', { type: 'text', id: 'threshold', placeholder: 'enter the threshold here' }),
					React.createElement('input', { type: 'text', id: 'secretsub', onKeyPress: this.sub, placeholder: 'enter secret here' })
				),
				React.createElement('div', { id: 'share-output' })
			);
		}
	}]);

	return Share;
}(React.Component);

/*
 *
 * Below is the code for the Recovery page
 *
 * */

function RecoverPage() {
	ReactDOM.render(React.createElement(Recover, null), document.getElementById('root'));
}

function RecoverHeader(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ className: 'shareRecoverHeader' },
			props.recover
		)
	);
}

function RecoverHeaderContainer(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ className: 'shareRecoverHeaderContainer' },
			React.createElement(RecoverHeader, { recover: props.recover })
		)
	);
}

function ShareQuery(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ id: 'shareQuery' },
			props.query
		)
	);
}

function ShareQueryContainer(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ id: 'shareQueryContainer' },
			React.createElement(ShareQuery, { query: props.query }),
			React.createElement(ShareNum, { up: props.up, func: props.func, clear: props.clear })
		)
	);
}

function generate_divs() {
	var n = document.getElementById('shareNum').value;
	//FIXME: be sure to parse inputs!!
	return parseInt(n, 10);
}

var ShareNum = function (_React$Component3) {
	_inherits(ShareNum, _React$Component3);

	function ShareNum(props) {
		_classCallCheck(this, ShareNum);

		var _this3 = _possibleConstructorReturn(this, (ShareNum.__proto__ || Object.getPrototypeOf(ShareNum)).call(this, props));

		_this3.num = function (event) {
			var x = document.getElementById('shareNum').value;
			if (!x || event.charCode) {
				return;
			}
			if (!isNaN(x) && x != "") {
				props.clear();
				props.func(0, []);
			}
		};
		return _this3;
	}

	_createClass(ShareNum, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement('input', { id: 'shareNum', onKeyUp: this.num })
			);
		}
	}]);

	return ShareNum;
}(React.Component);

function Node(props) {
	return React.createElement(
		'div',
		{ className: 'field' },
		React.createElement('input', { type: 'text', id: props.k, className: 'inputField', placeholder: 'enter your share here', onChange: props.grabFields, key: props.key })
	);
}

function RecoverSecret(props) {
	return React.createElement(
		'div',
		{ id: 'recoverButtonWrapper' },
		React.createElement(
			'button',
			{ id: 'recoverButton', onClick: props.func },
			props.name
		)
	);
}

function Output(props) {
	return React.createElement('div', { id: 'output' });
}

var Recover = function (_React$Component4) {
	_inherits(Recover, _React$Component4);

	function Recover(props) {
		_classCallCheck(this, Recover);

		var _this4 = _possibleConstructorReturn(this, (Recover.__proto__ || Object.getPrototypeOf(Recover)).call(this, props));

		_this4.triggerRecovery = function () {
			/* call recovery function on input shares */
			var xs = [];
			var ys = [];
			_this4.state.data.shift();
			for (var i = 0; i < _this4.state.data.length; i++) {
				// save xs component
				xs.push(_this4.state.data[i][0]);
				// save ys component
				ys.push(_this4.state.data[i].slice(2));
			}
			var secret = recover(xs, ys);
			var out = document.getElementById('output');
			out.textContent = secret;
		};

		_this4.clearArray = function () {
			/* clear the field array */
			_this4.setState({
				fields: []
			});
		};

		_this4.state = {
			recover: "/Recover",
			query: "enter the number of shares",
			fields: [],
			data: []
		};
		_this4.clearArray = _this4.clearArray.bind(_this4);
		_this4.addItems = _this4.addItems.bind(_this4);
		_this4.updateFields = _this4.updateFields.bind(_this4);
		return _this4;
	}

	_createClass(Recover, [{
		key: 'addItems',
		value: function addItems(index, array) {
			var thresh = document.getElementById('shareNum').value;
			if (index == thresh) {
				this.setState(function (state, props) {
					return {
						fields: array
					};
				});
				return;
			}
			index++;
			array.push(React.createElement(Node, { grabFields: this.updateFields, key: index, k: index }));
			this.addItems(index, array);
		}
	}, {
		key: 'updateFields',
		value: function updateFields(event) {
			var index = event.target.id;
			var newArr = this.state.data.slice();
			if (newArr[index - 2] == undefined) newArr[index] = "";
			newArr[index] = event.target.value;
			this.setState({ data: newArr });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			return React.createElement(
				React.Fragment,
				null,
				React.createElement(RecoverHeaderContainer, { recover: this.state.recover, onClick: this.grabFields }),
				React.createElement(ShareQueryContainer, { query: this.state.query, up: this.updateValue, func: function func() {
						_this5.addItems(0, []);
					}, clear: function clear() {
						_this5.clearArray();
					} }),
				React.createElement(
					'div',
					{ id: 'fieldContainer:' },
					this.state.fields,
					React.createElement(RecoverSecret, { name: 'Recover Secret', func: this.triggerRecovery }),
					React.createElement(Output, null)
				)
			);
		}
	}]);

	return Recover;
}(React.Component);