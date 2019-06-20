function return_decimal(hexstring) {
	// return value associated with hex byte
	if (hexstring == 'za')
		return 256;
	else if (hexstring == 'zb')
		return 257;
	else
		return parseInt(hexstring, 16);
}
console.log(return_decimal('a7'));
console.log(return_decimal('b3'));
console.log(return_decimal('9f'));
console.log(return_decimal('da'));
console.log(return_decimal('89'));
