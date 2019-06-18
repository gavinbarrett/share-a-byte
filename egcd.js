let mod = require('./number.js').mod;
let egcd = require('./number.js').egcd;
let mod_inv = require('./number.js').mod_inv;

function gen_coeff(k, field) {
	let coeffs = [];
	for (let i = 0; i < k; i++) {
		let r = 0;
		while (r == 0 || coeffs.includes(r)) {
			r = Math.floor(Math.random() * field + 1);
		}
		coeffs.push(r);
	}
	return coeffs;
}

function horners(x, k, field, poly, secret) {
	let result = secret;
	// evaluate polynomial with horner's method
	for(let i = 1; i < poly.length; i++)
			result = mod(mod(((result * x), field) + poly[i]), field);
	return result;
}

function pad(str) {
        let n = str.length % 8;
        if (n == 0)
                return str;
        let z = "0";
        let newStr = str + z.repeat((8 - n));
        return newStr;
}

function encode_secret(secret) {
        let s = "";
        for (let i = 0; i < secret.length; i++) {
                let x = secret[i].charCodeAt(0).toString(2);
                //console.log(pad(x));
                let y = parseInt(x, 2);
                y = String.fromCharCode(y);
                //console.log(y);

		s += pad(secret[i].charCodeAt(0).toString(2));
		//s.push(pad(secret[i].charCodeAt(0).toString(2)));
                //console.log(secret[i].charCodeAt(0).toString(2));

        }
        return s;
}

function split_secret(n, k, field, coeffs, secret) {
	let shares = [];
	let s = 0;
	for (let i = 0; i < n; i++) {
		s = mod(horners(i+1, k, field, coeffs, secret), field);
		shares.push(s);
	}
	return shares;
}

function share(n, k, plaintext) {

	if (k > n) {
		console.log('threshold too large');
		return;
	}

	let s = [];

	let x = encode_secret(plaintext);
	console.log(x);
	let y = parseInt(x,2);
	console.log(y);
	let field = 257;
	for (let i = 0; i < x.length; i+=8) {
		let r = x.slice(i, i+8);
		console.log(r);
		let coeffs = gen_coeff(k, field);
		let c = coeffs.unshift(parseInt(r,2));
		console.log(coeffs);
		let shares = split_secret(n,k,field,coeffs,x);
		for (let j = 0; j < shares.length; j++) {
			// handle edge cases where r=256 or 257
			let share = shares[j].toString(16);
			if (share.length == 1)
				share = "0" + share;
			if (share == "100")
				share = "za";
			else if (share == "101")
				share = "zb";
			// concatenate shares
			s[j] += share;
			console.log('share: ', share);
		}
	}
	for (let z = 0; z < s.length; z++) {
		console.log(s[z]);
	}
}

/* FIXME: place functions in a loop, concatenating values */
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
				secret += mod(field + return_decimal(ys[i]) * evaluate_poly(x, i, xs, field), field);
		return mod(secret, field);
}

function recover(xs, ys, field) {
		// interpolate polynomial at 0
		let secret = '';
		for (let i = 0; i < ys.length; i++) {
			s = interpolate(0, xs, ys[i], field);
			secret += String.fromCharCode(s);
			console.log(secret);
		}
		console.log('SECRET', secret);
}

function normalize_hex(hexstring) {
	// return an array of bytes from a hexstring
	return hexstring.match(/.{2}/g);
}

function return_decimal(hexstring) {
	// return value associated with hex byte
	if (hexstring == 'za')
		return 256;
	else if (hexstring == 'zb')
		return 257;
	else
		return parseInt(hexstring, 16);
}

let xs = [1,2];

let ys = [['83', 'cd'], ['54', '96']];
recover(xs, ys, 257);
//share(2,2,'hi');
