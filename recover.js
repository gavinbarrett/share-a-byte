let mod = require('./number.js').mod;
let mod_inv = require('./number.js').mod_inv;

/*
 *
 * function normalize_hex(hexstring) {
	// return an array of bytes from a hexstring
	return hexstring.match(/.{2}/g);
}
 *
 * */

function return_decimal(hexstring) {
	// return value associated with hex byte
	if (hexstring == 'za')
		return 256;
	else if (hexstring == 'zb')
		return 257;
	else
		return parseInt(hexstring, 16);
}

function evaluate_poly(x, xi, xs, field) {
		let numer = 1;
		let denom = 1;
		for (let i = 0; i < xs.length; i++) {
				if (xi == i)
					continue;
				numer = mod(numer * (x - xs[i]), field);
				denom = mod(denom * (xs[xi] - xs[i]), field);
		}
		return mod(numer * mod_inv(denom, field), field);
}

function interpolate(x, xs, ys, field) {
		let secret = 0;
		for (let i = 0; i < xs.length; i++)
				secret += mod(field + ys[i] * evaluate_poly(x, i, xs, field), field);
		return mod(secret, field);
}

function recover(xs, ys, field) {
		// interpolate polynomial at 0
		let secret = '';

		for (let i = 0; i < ys.length; i++) {
			let s = interpolate(0, xs, ys[i], field);
			secret += " ";
			secret += s;
			console.log(secret);
		}
		console.log('SECRET', secret);
}

module.exports = {
	recover: recover,
};
