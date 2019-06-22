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

function return_decimal(hexstring) {
        /* return value associated with hex byte */
        if (hexstring == 'za')
                return 256;
        else if (hexstring == 'zb')
                return 257;
        else
                return parseInt(hexstring, 16);
}

function mod(num, prime) {
        /* computes the modulus of a number */
        let n = num % prime;
        if (n < 0)
                n = prime + n;
        return n;
}

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
		for (let i = 0; i < xs.length; i++) {
				secret += mod(field + ys[i] * evaluate_poly(x, i, xs, field), field);
		}
		return mod(secret, field);
}

function process_shares(a) {
        let c = [];
        for (let i = 0; i < a.length; i++) {
                let x = a[i].match(/.{1,2}/g);
                for (let j = 0; j < x.length; j++) {
                        if (c[j] == undefined)
                                c[j] = [];
                        if (c[j][i] == undefined)
                                c[j][i] = 0;
                        c[j][i] = return_decimal(x[j]);
                        //console.log(x[j]);
                }
        }
        //console.log(c);
	return c;
}

function recover(xs, ys, field) {
		/* recover the secret */
		let a = process_shares(ys);
		//console.log(a)
	
		let secret = '';

		for (let i = 0; i < a.length; i++) {
			let s = interpolate(0, xs, a[i], field);
			secret += String.fromCharCode(s);
		}
		console.log('The secret is: ', secret);
}

module.exports = {
	recover: recover,
};

