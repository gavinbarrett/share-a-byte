let message = "S/ecretF/racture";
let speed = 50;
let i = 0;

function w() {
	/* write out the title in a typewriter fashion */
	if (i < message.length) {
		let heading = document.getElementById('heading');
		heading.textContent += message.charAt(i);
		i++;
		setTimeout(w, speed);
	}
}
