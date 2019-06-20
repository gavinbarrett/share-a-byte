let mod = require('../number.js').mod;

function horners(x, k, field, poly, secret) {
        let result = secret;
        // evaluate polynomial with horner's method
        for(let i = 1; i < k; i++)
                        result = mod(mod(result * x, field) + poly[i], field);
        return result;
}

let x = 0;
let k = 3;
let field = 257;
let poly = [23,1,56,3];
let secret = 245;
console.log(horners(x,k,field,poly,secret));
