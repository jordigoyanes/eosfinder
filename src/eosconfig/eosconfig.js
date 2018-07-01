import Eos from 'eosjs'
let config = {
    httpEndpoint: 'http://127.0.0.1:8888',
    mockTransactions: () => 'pass', // or 'fail'
    transactionHeaders: (expireInSeconds, callback) => {
      callback(null/*error*/, headers)
    },
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true
  }


  let eos = Eos.Localnet(config)

  export {eos}