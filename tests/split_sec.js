let mod = require('../number.js').mod;

function horners(x, k, field, poly, secret) {
        let result = poly[0];
        // evaluate polynomial with horner's method
        for(let i = 1; i < k; i++)
                        result = mod(mod(result * x, field) + poly[i], field);
        return result;
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

let n = 2;
let k = 2;
let field = 257;
let coeffs = [222,34,5,61,19];
let secret = 101
console.log(split_secret(n,k,field,coeffs,secret));
