import { motion } from "framer-motion";

function Wrapper(props) {
	return React.createElement(motion.div, {
		animate: { rotate: 360 },
		transition: { duration: 2 }
	});
}
function Page(props) {
	return React.createElement(
		"div",
		{ id: "back" },
		React.createElement(Wrapper, null)
	);
}
ReactDOM.render(React.createElement(Page, null), document.getElementById('root'));