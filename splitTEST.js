function return_decimal(hexstring) {
        /* return value associated with hex byte */
        if (hexstring == 'za')
                return 256;
        else if (hexstring == 'zb')
                return 257;
        else
                return parseInt(hexstring, 16);
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
	console.log(c);
}

let a = ['f6272c','4a2aza','bcff18'];
process_shares(a);
