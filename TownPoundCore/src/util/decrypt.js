// import CryptoJS from 'crypto-js'
import CryptoJS from 'cryptojs'
import util from 'util'

const decrypt = (toDecrypt, key) => {

  var bytes = CryptoJS.DES.decrypt(toDecrypt, key)
  var plaintext = bytes.toString(CryptoJS.enc.Utf8)

  return plaintext
}

export default decrypt
