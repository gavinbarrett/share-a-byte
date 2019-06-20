let mod = require('./number.js').mod;

function pad(str) {
        let n = str.length % 8;
        if (n == 0)
                return str;
        let z = "0";
        let newStr = z.repeat((8 - n)) + str;
        return newStr;
}

function encode_secret(secret) {
        let s = "";
        for (let i = 0; i < secret.length; i++) {
                let x = secret[i].charCodeAt(0).toString(2);
                console.log('SECRET: ' + secret[i].charCodeAt(0));
		let y = parseInt(x, 2);
                y = String.fromCharCode(y);
		s += pad(secret[i].charCodeAt(0).toString(2));
		}
        return parseInt(s, 2);
}

function split_secret(n, k, field, coeffs, secret) {
	let shares = [];
	let s = 0;
	for (let i = 0; i < n; i++) {
		s = horners(i+1, k, field, coeffs, secret);
		shares.push(s);
	}
	return shares;
}

function horners(x, k, field, poly, secret) {
	let result = poly[0];
	// evaluate polynomial with horner's method
	for(let i = 1; i < k; i++)
		result = mod(mod(result * x, field) + poly[i], field);
	return result;
}

function gen_coeff(k, field) {
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


function share(n, k, plaintext) {

	if (k > n) {
		console.log('threshold too large');
		return;
	}
	let s = [""];
	let field = 257;
	for (let i = 0; i < plaintext.length; i++) {
		let x = encode_secret(plaintext[i]);
		console.log(x);
		let coeffs = gen_coeff(k, field);
		coeffs.unshift(x);
		let shares = split_secret(n,k,field,coeffs.reverse(),x);
		for (let j = 0; j < shares.length; j++) {
			if (s[j] == undefined)
				s[j] = "";
			// handle edge cases where r=256 or 257
			let share = shares[j];
			/*
			if (share.length == 1)
				share = "0" + share;
			if (share == "100")
				share = "za";
			else if (share == "101")
				share = "zb";
			// concatenate shares
			*/
			s[j] += share + " ";
		}
	}
	console.log(s);
	console.log('Shares: ');
	for (let z = 0; z < s.length; z++) {
		console.log(s[z]);
	}
}

module.exports = {
	share: share,
};
