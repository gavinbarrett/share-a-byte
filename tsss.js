const share = require('./shareTest.js').share;
const recover = require('./recoverTest').recover;

let xs = [1,2,3];
let ys = ['a3e1e1404e5e443ab51a16398d6ac20edd51cc93173863','48c70229c32211a184100c0ff6a5622698ac3576654ee4','4327d620d0a0cd97e04756d39b2354bfa182a1db1b75b6'];
recover(xs, ys, 257);
//share(3,3,'SuperSecretPassword1234');
