var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Below is code for the landing page */
function Heading() {
	return React.createElement("div", { id: "heading" });
}

function Subheader(props) {
	return React.createElement(
		"div",
		{ id: "subheader" },
		props.sub
	);
}

function HeadingContainer(props) {
	return React.createElement(
		"div",
		{ id: "headingContainer" },
		React.createElement(Heading, null),
		React.createElement(Subheader, { sub: props.sub })
	);
}

function ShareButton(props) {
	return React.createElement(
		"div",
		{ "class": "button", onClick: SharePage },
		props.share
	);
}

function RecoverButton(props) {
	return React.createElement(
		"div",
		{ "class": "button", onClick: RecoverPage },
		props.recover
	);
}

function SelectionBox(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			"div",
			{ id: "selectionBox" },
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
			"div",
			{ id: "selectionBoxContainer" },
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
			sub: "a byte-sized secret sharing scheme",
			share: "share a secret",
			recover: "recover a secret"
		};
		return _this;
	}

	_createClass(LandingPage, [{
		key: "render",
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
			"div",
			{ "class": "shareRecoverHeader" },
			props.share
		)
	);
}

function ShareHeaderContainer(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			"div",
			{ "class": "shareRecoverHeaderContainer" },
			React.createElement(ShareHeader, { share: props.share })
		)
	);
}

var Share = function (_React$Component2) {
	_inherits(Share, _React$Component2);

	function Share(proper) {
		_classCallCheck(this, Share);

		var _this2 = _possibleConstructorReturn(this, (Share.__proto__ || Object.getPrototypeOf(Share)).call(this, proper));

		_this2.state = {
			share: "S/hare"
		};
		return _this2;
	}

	_createClass(Share, [{
		key: "render",
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(ShareHeaderContainer, { share: this.state.share })
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
			"div",
			{ "class": "shareRecoverHeader" },
			props.recover
		)
	);
}

function RecoverHeaderContainer(props) {
	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			"div",
			{ "class": "shareRecoverHeaderContainer" },
			React.createElement(RecoverHeader, { recover: props.recover })
		)
	);
}

var Recover = function (_React$Component3) {
	_inherits(Recover, _React$Component3);

	function Recover(props) {
		_classCallCheck(this, Recover);

		var _this3 = _possibleConstructorReturn(this, (Recover.__proto__ || Object.getPrototypeOf(Recover)).call(this, props));

		_this3.state = {
			recover: "/Recover"
		};
		return _this3;
	}

	_createClass(Recover, [{
		key: "render",
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(RecoverHeaderContainer, { recover: this.state.recover })
			);
		}
	}]);

	return Recover;
}(React.Component);