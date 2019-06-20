def _horners(x, k, field, coeff, secret):
    ''' Evaluate the polynomial with Horner's method '''
    res = coeff[0]
    for i in range(1, k):
        res = ((res * x) % field + coeff[i]) % field
    return res

x = 0
k = 3
field = 257
coeff = [23,1,56,3]
secret = 245;
print(_horners(x,k,field,coeff,secret))
