// util/thirdapi.js
import Axios from '../utils/Axios'
import axios from 'axios'
import config from '../utils/config'
import { store } from '../../store'
const BigNumber = require('bignumber.js')

Axios.axios()

export default {
  getZKspaceBalance: function (req) {
    return new Promise((resolve, reject) => {
      if (req.localChainID !== 12 && req.localChainID !== 512) {
        reject({
          errorCode: 1,
          errMsg: 'getZKSpaceAccountError_wrongChainID',
        })
      }
      const url =
        (req.localChainID === 512
          ? config.ZKSpace.Rinkeby
          : config.ZKSpace.Mainnet) +
        '/account/' +
        req.account +
        '/' +
        'balances'
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200 && response.statusText == 'OK') {
            var respData = response.data
            if (respData.success == true) {
              resolve(respData.data.balances.tokens)
            } else {
              reject(respData.data)
            }
          } else {
            reject({
              errorCode: 1,
              errMsg: 'NetWorkError',
            })
          }
        })
        .catch(function (error) {
          reject({
            errorCode: 2,
            errMsg: error,
          })
        })
    })
  },
  getZKTransferGasFee: function (localChainID, account) {
    let ethPrice = store.state.transferData.ethPrice
      ? store.state.transferData.ethPrice
      : 1000
    return new Promise((resolve, reject) => {
      if (localChainID !== 12 && localChainID !== 512) {
        reject({
          errorCode: 1,
          errMsg: 'getZKSpaceGasFeeError_wrongChainID',
        })
      }
      const url =
        (localChainID === 512
          ? config.ZKSpace.Rinkeby
          : config.ZKSpace.Mainnet) +
        '/account/' +
        account +
        '/' +
        'fee'
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200 && response.statusText == 'OK') {
            var respData = response.data
            if (respData.success == true) {
              const gasFee = new BigNumber(respData.data.transfer).dividedBy(
                new BigNumber(ethPrice)
              )
              let gasFee_fix = gasFee.decimalPlaces(6, BigNumber.ROUND_UP)
              resolve(Number(gasFee_fix))
            } else {
              reject(respData.data)
            }
          } else {
            reject({
              errorCode: 1,
              errMsg: 'NetWorkError',
            })
          }
        })
        .catch(function (error) {
          reject({
            errorCode: 2,
            errMsg: error,
          })
        })
    })
  },
  getZKWithDrawGasFee: function (localChainID, account) {
    let ethPrice = store.state.transferData.ethPrice
      ? store.state.transferData.ethPrice
      : 1000
    return new Promise((resolve, reject) => {
      if (localChainID !== 12 && localChainID !== 512) {
        reject({
          errorCode: 1,
          errMsg: 'getZKSpaceGasFeeError_wrongChainID',
        })
      }
      const url =
        (localChainID === 512
          ? config.ZKSpace.Rinkeby
          : config.ZKSpace.Mainnet) +
        '/account/' +
        account +
        '/' +
        'fee'
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200 && response.statusText == 'OK') {
            var respData = response.data
            if (respData.success == true) {
              const gasFee = new BigNumber(respData.data.withdraw).dividedBy(
                new BigNumber(ethPrice)
              )
              let gasFee_fix = gasFee.decimalPlaces(6, BigNumber.ROUND_UP)
              resolve(Number(gasFee_fix))
            } else {
              reject(respData.data)
            }
          } else {
            reject({
              errorCode: 1,
              errMsg: 'NetWorkError',
            })
          }
        })
        .catch(function (error) {
          reject({
            errorCode: 2,
            errMsg: error,
          })
        })
    })
  },
  /**
   *
   * @param {localChianID,account} req
   * @returns
   */
  getZKAccountInfo: function (localChainID, account) {
    return new Promise((resolve, reject) => {
      if (localChainID !== 12 && localChainID !== 512) {
        reject({
          errorCode: 1,
          errMsg: 'getZKSpaceAccountInfoError_wrongChainID',
        })
      }
      const url =
        (localChainID === 512
          ? config.ZKSpace.Rinkeby
          : config.ZKSpace.Mainnet) +
        '/account/' +
        account +
        '/' +
        'info'
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200 && response.statusText == 'OK') {
            var respData = response.data
            if (respData.success == true) {
              resolve(respData.data)
            } else {
              reject(respData.data)
            }
          } else {
            reject({
              errorCode: 1,
              errMsg: 'NetWorkError',
            })
          }
        })
        .catch(function (error) {
          reject({
            errorCode: 2,
            errMsg: error,
          })
        })
    })
  },
  sendTransfer: async function (req) {
    if (req.localChainID !== 12 && req.localChainID !== 512) {
      return {
        code: '1',
        error: 'sendZKSpaceTransferError_wrongChainID',
      }
    }
    const url =
      (req.localChainID === 512
        ? config.ZKSpace.Rinkeby
        : config.ZKSpace.Mainnet) + '/tx'
    const params = {
      tx: req.tx,
      signature: req.signature,
      fastProcessing: null,
    }
    console.log('params =', params)
    let response = await axios.post(url, params)
    console.log('response =', response)
  },
  getZKSpaceTransactionData: async function (localChainID, txHash) {
    return new Promise((resolve, reject) => {
      if (localChainID !== 12 && localChainID !== 512) {
        reject({
          errorCode: 1,
          errMsg: 'getZKTransactionDataError_wrongChainID',
        })
      }
      const url =
        (localChainID === 512
          ? config.ZKSpace.Rinkeby
          : config.ZKSpace.Mainnet) +
        '/tx/' +
        txHash
      axios
        .get(url)
        .then(function (response) {
          console.warn('response =', response)
          if (response.status === 200 && response.statusText === 'OK') {
            var respData = response.data
            if (respData.success === true) {
              resolve(respData)
            } else {
              reject(respData)
            }
          } else {
            reject({
              errorCode: 1,
              errMsg: 'NetWorkError',
            })
          }
        })
        .catch(function (error) {
          reject({
            errorCode: 2,
            errMsg: error,
          })
        })
    })
  },
}
