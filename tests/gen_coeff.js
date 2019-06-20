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

let k = 2;
let field = 257;
console.log(gen_coeff(2,257));
