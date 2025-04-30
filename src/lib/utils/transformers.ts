import { Mnemonic, Wallet } from '../../generated/prisma'
import { decrypt, encrypt } from '../encryption/AES256'
import { ENCRYPTION_KEY } from '../constants/env'


type MnemonicTransformerType =
    & Pick<Mnemonic, 'words'>
    & Partial<Omit<Mnemonic, 'words'>>

export const mnemonicTransformer = (
    mnemonic: MnemonicTransformerType,
    options?: { decrypt?: boolean }
): Mnemonic => {
    const fn = options?.decrypt ? decrypt : encrypt
    return {
        ...mnemonic,
        words: fn(ENCRYPTION_KEY, mnemonic.words),
    } as Mnemonic
}

type WalletTransformerType =
    & Pick<Wallet, 'address' | 'private_key'>
    & Partial<Omit<Wallet, 'address' | 'private_key'>>

export const walletTransformer = (
    wallet: WalletTransformerType,
    options?: { decrypt?: boolean }
): Wallet => {
    const fn = options?.decrypt ? decrypt : encrypt
    return {
        ...wallet,
        private_key: fn(ENCRYPTION_KEY, wallet.private_key),
    } as Wallet
}
