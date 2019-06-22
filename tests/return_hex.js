function return_hex(number) {
	if (number == 257)
		return 'zb';
	else if (number == 256)
		return 'za';
	else
		return number.toString(16);
}

console.log(return_hex(45));
console.log(return_hex(81));
console.log(return_hex(257));
console.log(return_hex(256));
console.log(return_hex(255));
console.log(return_hex(41));
console.log(return_hex(3));
console.log(return_hex(19));
console.log(return_hex(144));
console.log(return_hex(56));
console.log(return_hex(78));
