<template>
    <div class="faucet">
        <span>faucet:</span>
        <el-cascader style="width:25vw;margin: 10px 0;" v-model="value" :options="options" @change="handleChange"
            placeholder="select token">
        </el-cascader>
        <el-input v-show="isOPChain" style="width:25vw" v-model="userAddress" placeholder="input address"></el-input>
        <button @click="goTo" style="width:100px;margin:15px 10px 10px 10px">get</button>
    </div>
</template>

<script>
import { Coin_ABI } from '../../util/constants/contract/contract'
import env from "../../../env"
import Web3 from "web3"
export default {
    name: 'faucet',
    data() {
        return {
            options: [{
                value: "5",
                label: 'rinkeby',
                children: [{
                    label: "USDC",
                    tokenDecimal: 6,
                    value: "0x93EB870A440f4D0758690c94D98b0502EFDFe03D"
                }, {
                    label: "USDT",
                    tokenDecimal: 6,
                    value: "0x91c18194676FF524022ad23A5Fcf461951E8AaB8"
                }, {
                    label: "LRC",
                    tokenDecimal: 18,
                    value: "0x1A9aa4619cc791D87Aec0A0f8B1E2aaeC05411F8"
                }]
            }, {
                value: "22",
                label: "arbitrum_test",
                children: [{
                    label: "USDC",
                    tokenDecimal: 6,
                    value: "0x2289b768bfaff670fee5378937069017d7380b85"
                }]
            }, {
                value: "66",
                label: "polygon_test",
                children: [{
                    label: "USDC",
                    tokenDecimal: 6,
                    value: "0xfF9f5BafbD4aDD40a087b59929b769da55aec26E"
                }]
            }, {
                value: "77",
                label: "optimism_test",
                children: [{
                    label: "USDC",
                    tokenDecimal: 6,
                    value: "0x581244507793293Ae4cc99ecb1bBe71e7F35f901"
                }]
            }, {
                value: "510",
                label: "metis_test",
                children: [{
                    label: "USDC",
                    tokenDecimal: 6,
                    value: "0x3E5C5F0F1177367B0c631ECF170154C64C1ffBd1"
                }]
            }, {
                value: "33",
                label: "zksync_test",
                children: [{
                    label: "USDC",
                    tokenDecimal: 6,
                    tokenAddress: "0xeb8f08a975ab53e34d8a0330e0d34de942c95926",
                    value: "https://wallet.zksync.io/transaction/mint/?network=rinkeby"
                }]
            }, {
                value: "99",
                label: "loopring_test",
                children: [{
                    label: "LRC",
                    tokenDecimal: 18,
                    tokenAddress: "0xfc28028d9b1f6966fe74710653232972f50673be",
                    value: "https://beta.loopring.io/#/trade/lite/ETH-LRC"
                }, {
                    label: "USDT",
                    tokenDecimal: 6,
                    tokenAddress: "0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a",
                    value: "https://beta.loopring.io/#/trade/lite/ETH-USDT"
                }]
            }, {
                value: "512",
                label: "zkspace_test",
                children: [{
                    label: "ZKS",
                    tokenDecimal: 18,
                    tokenAddress: "0xc2ffb3b384a6c8878e362c24b996569faf8d038e",
                    value: "https://zks.app/trade/swap"
                }, {
                    label: "USDT",
                    tokenDecimal: 6,
                    tokenAddress: "0xcd96fc9fa8fa04660678386062d4fa70b3e8e1de",
                    value: "https://zks.app/trade/swap "
                }]
            }],
            chainInfo: {
                chainId: '',
                address: ''
            },
            userAddress: '',
            isOPChain: false
        }
    },
    methods: {
        goTo: function () {
            const chainInfo = this.chainInfo
            if (chainInfo.chainId && chainInfo.address) {
                if (this.isOPChain && (!this.userAddress || this.userAddress.length != 42)) {
                    this.$notify.error({
                        title: 'please input address',
                        duration: 2000,
                    })
                } else if (this.isOPChain) {
                    console.log(chainInfo, "get chainInfo")
                    console.log(this.userAddress, "this.userAddress")

                    const provider = env.localProvider[chainInfo.chainId]
                    const web3 = new Web3(provider)

                    const tokenContract = new web3.eth.Contract(
                        Coin_ABI,
                        chainInfo.address
                    )
                    let gasLimit = 100000
                    const details = {
                        gas: web3.utils.toHex(gasLimit),
                        gasPrice: gasPrices, // converts the gwei price to wei
                        nonce: result_nonce,
                        chainId: chainID, // mainnet: 1, rinkeby: 4
                    }
                    details['to'] = tokenAddress
                    details['value'] = '0x0'
                    details['data'] = tokenContract.methods
                        .transfer(toAddress, web3.utils.toHex(amountToSend))
                        .encodeABI()






                } else {
                    window.open(chainInfo.address, "_blank");
                }
            }
        },
        isOP() {
            const chainInfo = this.chainInfo
            const opChains = ['5', '22', '66', '77', '510']
            this.isOPChain = opChains.indexOf(chainInfo.chainId) > -1 ? true : false
        },
        handleChange: function (e) {
            this.chainInfo.chainId = e[0]
            this.chainInfo.address = e[1]
            this.isOP()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.faucet {
    display: flex;
    width: 28vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
    border: 1px solid blanchedalmond;
    border-radius: 10px;
    position: absolute;
    left: 10px;
    top: 300px;
}
</style>
