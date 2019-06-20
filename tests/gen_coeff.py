from secrets import randbelow
def _gen_coeff(k, field):
    ''' Generate coefficients uniformly at random '''
    coeffs = []
    for i in range(k-1):
        r = 0
        while r == 0 or r in coeffs:
            r = randbelow(field)
        coeffs.append(r)
    return coeffs

k = 2
field = 257

print(_gen_coeff(k,field))
