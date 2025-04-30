import { PrismaClient } from '../generated/prisma'
import { Mnemonic, Wallet } from '../generated/prisma'

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

export const createMnemonic = async (
    data: Omit<Mnemonic, 'id' | 'created_at'>
): Promise<Mnemonic> =>
    prisma.mnemonic.create({
        data,
    })


export const createWallet = async (
    data: Omit<Wallet, 'id' | 'created_at'>
): Promise<Wallet> =>
    prisma.wallet.create({
        data,
    })


type FilterType =
    | { address: string }
    | { address: { equals: string } }
    | { name: string }
    | { name: { equals: string } }

export const findWallet = async (
    filter: FilterType
): Promise<(Wallet & { Mnemonic: Mnemonic }) | null> => {
    return prisma.wallet.findFirst({
        where: filter,
        include: { Mnemonic: true },
    })
}
