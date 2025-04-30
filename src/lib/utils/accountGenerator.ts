import { HDAccount, english, generateMnemonic, mnemonicToAccount } from 'viem/accounts'

export const getPrivateKey = (account: HDAccount) => {
    const hdKey = account.getHdKey()
    return Buffer.from(hdKey.privateKey!).toString('hex')
}

export const accountGenerator = () => {
    const mnemonic = generateMnemonic(english, 256)
    const account = mnemonicToAccount(mnemonic)
    const private_key = getPrivateKey(account)
    const { address } = account
    return { address, mnemonic, private_key }
}
