import {mod} from './number.js';

function pad(str) {
	/* pad a binary string to a multiple of eight */
        let n = str.length % 8;
        if (n == 0)
                return str;
        let z = "0";
        let newStr = z.repeat((8 - n)) + str;
        return newStr;
}

function encode_secret(secret) {
	/* encode secret into an integer */
        let s = "";
        for (let i = 0; i < secret.length; i++) {
                let x = secret[i].charCodeAt(0).toString(2);
		let y = parseInt(x, 2);
                y = String.fromCharCode(y);
		s += pad(secret[i].charCodeAt(0).toString(2));
		}
        return parseInt(s, 2);
}

function split_secret(n, k, field, coeffs, secret) {
	/* generate shares from all of the coefficients  */
	let shares = [];
	let s = 0;
	for (let i = 0; i < n; i++) {
		s = horners(i+1, k, field, coeffs, secret);
		shares.push(s);
	}
	return shares;
}

function horners(x, k, field, poly, secret) {
	/* evaluate polynomial with horner's method */
	let result = poly[0];
	for(let i = 1; i < k; i++)
		result = mod(mod(result * x, field) + poly[i], field);
	return result;
}

function gen_coeff(k, field) {
	/* generate random coefficients */
	let coeffs = [];
	for (let i = 0; i < k-1; i++) {
		let r = 0;
		while (r == 0 || coeffs.includes(r)) {
			r = Math.floor(Math.random() * field + 1);
		}
		coeffs.push(r);
	}
	return coeffs;
}

export function share(n, k, plaintext) {
	/* return shares for the plaintext */
	if (k > n) {
		console.log('threshold too large');
		return;
	}
	let s = [""];
	let field = 257;
	for (let i = 0; i < plaintext.length; i++) {
		let x = encode_secret(plaintext[i]);
		let coeffs = gen_coeff(k, field);
		coeffs.unshift(x);
		let shares = split_secret(n,k,field,coeffs.reverse(),x);
		for (let j = 0; j < shares.length; j++) {
			if (s[j] == undefined)
				s[j] = "";
			let share = parseInt(shares[j], 10);
			s[j] += String.fromCharCode(share);
		}
	}
	return s;
}
