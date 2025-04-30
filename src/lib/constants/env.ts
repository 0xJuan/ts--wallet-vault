require('dotenv').config({ path: '~/_config/.env' })

if (process.env.ENCRYPTION_KEY) { } else {
    console.error('::EXIT ERROR::\n', 'Missing ENCRYPTION_KEY in .env file')
    process.exit(1)
}

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
