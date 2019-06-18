function mod(num, prime) {
		// computes the modulus of a number with respect to 257
		let n = num % prime;
		if (n < 0)
				n = prime + n;
		return n;
}

function egcd(a,b,x,y) {
	if (a == 0) {
		x = 0;
		y = 1;
		return [b,x,y];
	}

	// returns array of three values
	let array = egcd(mod(b,a), a, x, y);
	let g = array[0];
	let x1 = array[1];
	let y1 = array[2];
	x = y1 - (Math.floor(b/a)) * x1;
	y = x1;
	return [g,x,y];
}

function mod_inv(k, prime) {
	let array = egcd(k, prime, 0, 0);
	let g = array[0];
	let x = array[1];
	let y = array[2];
	if (g != 1) {
		console.log('Cannot compute an inverse!', g);
		return;
	} else {
		return mod((mod(x, 257) + prime), 257);
	}
}

module.exports = {
		mod: mod,
		egcd: egcd,
		mod_inv: mod_inv,
};
