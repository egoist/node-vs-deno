import { Hash, encode } from 'https://deno.land/x/checksum/mod.ts'

// sha1
console.log(new Hash('sha1').digest(encode('hello world')).hex())

// md5
console.log(new Hash('md5').digest(encode('hello world')).hex())
