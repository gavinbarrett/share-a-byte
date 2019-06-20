import sys
def _egcd(a, b, x, y):
    ''' Extended Euclidean Algorithm '''
    if a == 0:
        x = 0
        y = 1
        return [b, x, y]
    g, x1, y1 = _egcd(b%a, a, x, y)
    x = y1 - int((b//a)) * x1
    y = x1
    return g, x, y

def _mod_inv(k, prime):
    ''' Modular inverse of k mod prime '''
    x = 0
    y = 0
    g, x, y = _egcd(k, prime, x, y)
    if g != 1:
        print('Cannot compute an inverse!')
        sys.exit(0)
    else:
        return ((x % prime) + prime) % prime

def _evaluate_poly(x, xi, xs, field):
    ''' Evaluate x values for each y '''
    numer = 1
    denom = 1
    for i in range(0, len(xs)):
        if xi == i:
            continue
        numer = numer * (x - xs[i]) % field
        denom = denom * (xs[xi] - xs[i]) % field
    return numer * _mod_inv(denom, field) % field

x = 0
xi = 2
xs = [122, 54, 92, 123]
field = 257
print(_evaluate_poly(x, xi, xs, field))
