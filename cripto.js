import { randomBytes } from "crypto";
import { createHash } from 'crypto'
import { promisify } from "util";

const randomBytesAsync =  promisify(randomBytes)


const buffer =  await randomBytesAsync(32);


const sid_hash = createHash('sha256').update('123').digest('base64')

console.log(sid_hash)

const hex = buffer.toString('hex')
const base64 = buffer.toString('base64')
const base64url = buffer.toString('base64url')


// console.log(hex)
// console.log(base64)
// console.log(base64url)