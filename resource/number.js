export function mod(num, prime) {
	/* computes the modulus of a number */
	let n = num % prime;
	if (n < 0)
		n = prime + n;
	return n;
}

function egcd(a,b,x,y) {
	/* find the greatest common denominator */
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
	/* return the mod inverse */
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

export function return_decimal(hexstring) {
        /* return value associated with hex byte */
        if (hexstring == 'za')
                return 256;
        else if (hexstring == 'zb')
                return 257;
        else
                return parseInt(hexstring, 16);
}

export function return_hex(number) {
	if (number == 257)
		return 'zb';
	else if (number == 256)
		return 'za';
	else
		return number.toString(16);
}
