import { mod } from './number.js';
import { return_hex } from './number.js';

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

function mod_field(number) {
	return number % 257;
}

function gen_coeff(k, field) {
	/* generate random coefficients */

	// create a uint8 buffer
	let arr = new Uint8Array(k-1);
	// get cryptographically secure bytes 
	window.crypto.getRandomValues(arr);
	// return the buffer as an array
	return Array.from(arr);
}

export function share(n, k, plaintext) {
	/* return shares for the plaintext */
  let a = parseInt(n, 10);
  let b = parseInt(k, 10);
	if (b > a) {
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
			//s[j] += String.fromCharCode(share);
			s[j] += return_hex(share);
		}
	}
	return s;
}
