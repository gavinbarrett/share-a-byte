def _horners(x, k, field, coeff, secret):
    ''' Evaluate the polynomial with Horner's method '''
    res = coeff[0]
    for i in range(1, k):
        res = ((res * x) % field + coeff[i]) % field
    return res

def _split_secret(n, k, field, coeffs, secret):
    ''' Split secret into shares '''
    shares = []
    s = 0
    for i in range(n):
        s = _horners(i+1, k, field, coeffs, secret)
        shares.append(s)
    return shares


n = 2
k = 2
field = 257
coeff = [222,34,5,61,19]
secret = 101
print(_split_secret(n,k,field,coeff,secret))
