var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { share } from './share.js';
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
		{ 'class': 'button', onClick: SharePage },
		props.share
	);
}

function RecoverButton(props) {
	return React.createElement(
		'div',
		{ 'class': 'button', onClick: RecoverPage },
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
			{ 'class': 'shareRecoverHeader' },
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
	var secret = document.getElementById('secretsub').value;
	var shares = share(3, 3, secret);
	return shares;
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
			{ 'class': 'shareRecoverHeader' },
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
			{ 'class': 'shareRecoverHeaderContainer' },
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
			React.createElement(ShareNum, null)
		)
	);
}

function generate_divs() {
	var n = document.getElementById('shareNum').value;
	//FIXME: be sure to parse inputs!!
	return parseInt(n, 10);
}

var Generated = function (_React$Component3) {
	_inherits(Generated, _React$Component3);

	function Generated(props) {
		_classCallCheck(this, Generated);

		return _possibleConstructorReturn(this, (Generated.__proto__ || Object.getPrototypeOf(Generated)).call(this, props));
	}

	_createClass(Generated, [{
		key: 'render',
		value: function render() {
			var elements = ['one', 'two', 'three'];
			var items = [];

			for (var i = 0; i < elements.length; i++) {
				items.push(React.createElement(Generate_Divs, { child: props.message }));
			}

			return React.createElement(
				React.Fragment,
				null,
				React.createElement(Recover, null),
				React.createElement(
					'div',
					null,
					items
				)
			);
		}
	}]);

	return Generated;
}(React.Component);

var ShareNum = function (_React$Component4) {
	_inherits(ShareNum, _React$Component4);

	function ShareNum(props) {
		_classCallCheck(this, ShareNum);

		var _this4 = _possibleConstructorReturn(this, (ShareNum.__proto__ || Object.getPrototypeOf(ShareNum)).call(this, props));

		_this4.state = {
			message: "hey"
		};

		_this4.num = function (event) {
			if (event.charCode == 13) {
				var n = generate_divs();
				// FIXME: generate new divs
				_this4.setState({ generated: React.createElement(Generate_Divs, { child: _this4.state.message }) });
				console.log('setState called');
				/*this.setState({key: <Generate_Divs child={this.state.message}/>});*/

				/*ReactDOM.render(<Generated message={i+1} />, document.getElementById('root'));*/
			}
		};

		return _this4;
	}

	_createClass(ShareNum, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement('input', { id: 'shareNum', onKeyPress: this.num })
			);
		}
	}]);

	return ShareNum;
}(React.Component);

function Generate_Divs(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			null,
			props.child
		)
	);
}

var Recover = function (_React$Component5) {
	_inherits(Recover, _React$Component5);

	function Recover(props) {
		_classCallCheck(this, Recover);

		var _this5 = _possibleConstructorReturn(this, (Recover.__proto__ || Object.getPrototypeOf(Recover)).call(this, props));

		_this5.state = {
			recover: "/Recover",
			query: "enter the number of shares",
			message: "hey",
			divisors: []
		};
		return _this5;
	}

	_createClass(Recover, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(RecoverHeaderContainer, { recover: this.state.recover }),
				React.createElement(ShareQueryContainer, { query: this.state.query })
			);
		}
	}]);

	return Recover;
}(React.Component);