let mod = require('../public/number.js').mod;
let mod_inv = require('../public/number.js').mod_inv;

function evaluate_poly(x, xi, xs, field) {
	/* return value of polynomial at zero */
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
	/* return interpolation value for the subsecret */
		let secret = 0;
		for (let i = 0; i < xs.length; i++)
				secret += mod(field + ys[i] * evaluate_poly(x, i, xs, field), field);
		return mod(secret, field);
}

function recover(xs, ys, field) {
		/* recover the secret */
		let secret = '';

		for (let i = 0; i < ys.length; i++) {
			let s = interpolate(0, xs, ys[i], field);
			secret += String.fromCharCode(s);
		}
		console.log('The secret is: ', secret);
}

module.exports = {
	recover: recover,
};

