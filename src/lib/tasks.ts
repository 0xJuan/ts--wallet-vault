import { createMnemonic, createWallet, findWallet } from './dao'
import { accountGenerator } from './utils/accountGenerator'
import { mnemonicTransformer, walletTransformer } from './utils/transformers'


export const generate = async () => {
    const { address, mnemonic: words, private_key } = accountGenerator()

    const mnemonic = await createMnemonic(mnemonicTransformer({ words }))
    const wallet = await createWallet(walletTransformer({ address, private_key, Mnemonic_id: mnemonic.id }))

    console.info(`a: ${wallet.address}`)
}


export type FilterType =
    | { address: string }
    | { name: string }

export const lookup = async (filter: FilterType) => {
    const response = await findWallet(filter)
    if (!response) {
        console.error('Wallet not found')
        process.exit(1)
    }
    let { Mnemonic: mnemonic, ...wallet } = response
    wallet = walletTransformer(wallet, { decrypt: true })
    mnemonic = mnemonicTransformer(mnemonic, { decrypt: true })

    console.info(`a: ${wallet.address}`)
    console.info(`p: ${wallet.private_key}`)
    console.info(`m: ${mnemonic.words}`)
    console.info(`group: ${mnemonic.group}`)
}
