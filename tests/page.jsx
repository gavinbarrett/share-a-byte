import {motion} from "framer-motion";

function Wrapper(props) {
	return(<motion.div 
		animate={{ rotate: 360 }}
		transition={{ duration: 2 }}
		id="wrap" />);
}
function Page(props) {
	return(<div id="back">
	<Wrapper />
	</div>);
}
ReactDOM.render(<Page />, document.getElementById('root'));
