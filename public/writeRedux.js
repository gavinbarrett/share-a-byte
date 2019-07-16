let sec = "S/ecret";
let frac = "F/racture";
let speed = 60;
let i = 0;
let j = 0;

function write() {
	if (i < sec.length) {
		let heading1 = document.getElementById('heading1');
		heading1.textContent += sec.charAt(i);
		i++;
	}
	else {
		let heading2 = document.getElementById('heading2');
		heading2.textContent += frac.charAt(j);
		j++;
	}
	setTimeout(write, speed);
}
