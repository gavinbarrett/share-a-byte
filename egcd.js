function egcd(a,b,x,y) {
	if (a == 0) {
		x = 0;
		y = 1;
		return [b,x,y];
	}

	// returns array of three values
	let array = egcd(b%a, a, x, y);
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
		console.log('Cannot compute an inverse!');
		return;
	} else {
		return ((x % prime) + prime) % prime;
	}
}

function gen_coeff(k, field) {
	let coeffs = [];
	for (let i = 0; i < k; i++) {
		let r = 0;
		while (r == 0 || coeffs.includes(r)) {
			r = Math.floor(Math.random() * field + 1);
		}
		console.log('COEFF: 	', r);
		coeffs.push(r);
	}
	return coeffs;
}

function horners(x, k, field, poly, secret) {
	let result = secret;
	// evaluate polynomial with horner's method
	for(let i = 1; i < poly.length; i++)
		result = (result * x) % field + poly[i] % field;
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
		s = horners(i+1, k, field, coeffs, secret) % field;
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
	for (let x = 0; x < n; x++)
		s[x] = ' ';

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
		console.log(x.length);
		console.log(String.fromCharCode(shares[1]));
		for (let j = 0; j < shares.length; j++) {
			//console.log('share: ', j, shares[j]);
			console.log('SHARE:	 ', shares[j].toString(2));

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
				numer = numer * (x - xs[i]) % field;
				denom = denom * (xs[xi] - xs[i]) % field;
		}
		return numer * mod_inv(denom, field) % field;
}

function interpolate(x, xs, ys, field) {
		let secret = 0;
		for (let i = 0; i < xs.length; i++)
				secret += (field + ys[i] * evaluate_poly(x, i, xs, field)) % field;
		return secret % field;
}

function recover(xs, ys, field) {
		// interpolate polynomial at 0
		let secret = interpolate(0, xs, ys, field);
		console.log(secret);
}
let xs = [1,2,3];
let ys = ['a34be3a873', '020a5d5646', 'fdb2934651'];
recover(xs, ys, 257);
//share(3, 3, "hello");
