import low from 'lowdb'
import FileSync from 'lowdb/adapters/LocalStorage'
import seed from './seed'

const adapter = new FileSync('db')
const db = low(adapter)

db
    .defaults(seed)
    .write()
export default db