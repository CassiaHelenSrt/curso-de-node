import {
    type BinaryLike,
    type ScryptOptions,
    createHmac,
    randomBytes,
    scrypt,
} from "node:crypto";
import { promisify } from "util";

const randomBytesAsync = promisify(randomBytes);

const scryptAsync: (
    password: BinaryLike,
    salt: BinaryLike,
    keylen: number,
    options?: ScryptOptions,
) => Promise<Buffer> = promisify(scrypt);

const PEPPER = "segredo";

const salt = await randomBytesAsync(16);

const SCRYPT_OPTIONS: ScryptOptions = {
    N: 2 ** 14,
    r: 8,
    p: 1,
};

const password = "P@ssw0rd";

const password_normalized = password;

const password_hmac = createHmac("sha256", PEPPER)
    .update(password_normalized)
    .digest();

// console.log(password_hmac);

const dk = await scryptAsync(password_hmac, salt, 32, SCRYPT_OPTIONS);

// console.timeEnd("scrypt");

const password_hash = `${salt.toString("hex")}$${dk.toString("hex")}`;

console.log(password_hash);
