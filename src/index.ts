import { generate, lookup, FilterType } from './lib/tasks'


const main = async () => {
    const [cmd, args] = process.argv.slice(2)
    switch (cmd) {
        case 'generate':
        case 'g':
            await generate()
            process.exit(0)
        case 'lookup':
        case 'l':
            const [key, value] = args.split('=')
            await lookup({ [key]: value } as FilterType)
            process.exit(0)
        default:
            throw new Error('Invalid command')
    }

}

main()
    .catch(
        (err) => {
            console.error(err)
            process.exit(1)
        }
    )
