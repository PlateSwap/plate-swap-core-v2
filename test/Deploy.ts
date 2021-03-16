import chai, { expect } from 'chai'
import * as ethers from 'ethers'
import { Contract } from 'ethers'
import { AddressZero } from 'ethers/constants'
import { bigNumberify } from 'ethers/utils'
import { solidity, MockProvider, createFixtureLoader, deployContract } from 'ethereum-waffle'

import { getCreate2Address } from './shared/utilities'
import { factoryFixture } from './shared/fixtures'

import PlatePair from '../build/PlatePair.json'
import PlateFactory from '../build/PlateFactory.json'

describe('PlateSwapFactory', () => {
    /**
     * Use MetaMask to connect to binance smart chain and get test BNB's
     * Add your wallets private key here for testing, add also he public key to wallet
     */
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545')
    const privateKey = ''
    const wallet = new ethers.Wallet(privateKey, provider)
  
    const overrides = {
      gasLimit: 9999999,
      gasPrice: 39000000000
    }
  
    const factoryAddress = '0xC5Bd23291D425b4b3d7a22111bF779D350f40552'
    const testToken1 = '0x1800C5A2832A8c8F1C1c23cA57422Ff3A6D68515'
    const testToken2 = '0x89993A056252e3B0fD0eb20156cf6Ad877943Dd9'
  
    it('deployFactory', async () => {
        console.log('start deployContract plateFactory')

        const factoryContract = await deployContract(
        wallet,
        PlateFactory,
        ['0x7AD2EB2564937E7b4a9f7BaDd02FEF0b1F460469'],
        overrides
        )

        console.log(`contract factoryContract address ${factoryContract.address}`)
        console.log(`contract factoryContract deploy transaction hash ${factoryContract.deployTransaction.hash}`)

        await factoryContract.deployed()
        console.log(`finish deployContract swapFatory`)
    })
  
    it('deployCreatePair', async () => {
        console.log('start deployCreatePair')
        const factoryContract = new ethers.Contract(factoryAddress, JSON.stringify(PlateFactory.abi), provider)
        .connect(wallet)
    
        const tx = await factoryContract.createPair(testToken1, testToken2, overrides)
    
        console.log(`createPair ${tx.hash}`)
        await tx.wait()
    })

    /** LOGS
     *  start deployContract plateFactory
        contract factoryContract address 0xC5Bd23291D425b4b3d7a22111bF779D350f40552
        contract factoryContract deploy transaction hash 0xacc33fb6e698f079b2f3ce88f80a4d64577a7a50965de9b206866107f9400440
        finish deployContract swapFatory

        -------------------------------------

        start deployCreatePair
        createPair 0xe7d488100f912be3047beff34138c9de4738e715972378ed3e652ea8844bbc3f
     */

  })