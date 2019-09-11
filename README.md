# Node vs Deno

If you come from [Node.js](https://nodejs.org), you might find that a lot of things are very similar in [Deno](https://deno.land), here we show some features that Deno and Node.js have in common, it would be great for learning purpose.

Keep updating..

## Table of Contents

<!-- toc -->

- [Built-in features](#built-in-features)
- [Check if it's running in Deno](#check-if-its-running-in-deno)
- [Command-line arguments](#command-line-arguments)
- [Spawn a subprocess](#spawn-a-subprocess)
- [Hashing algorithms](#hashing-algorithms)

<!-- tocstop -->

## Built-in features

In Node.js, most built-in features are exposed as CommonJS modules which you can use via `require` calls, while in Deno, they are exposed on the global namespace `Deno`.

For example, in Node.js you use `require('child_process').spawn` to start a subprocess, in Deno you can use `Deno.run` instead.

For list of all available features go to [Deno API Reference](https://deno.land/typedoc/)

## Check if it's running in Deno

Due to the fact that Deno exposes its specific features on `Deno` namespace, you can use it to determine if your program is running in Deno:

```ts
const isDeno = typeof window !== 'undefined' && window.Deno
```

## Command-line arguments

`process.argv` represents command line arguments in Node.js, run the example code:

<p>
<a href="./examples/args.js">
<img alt="run node example" src="https://user-images.githubusercontent.com/8784712/64687080-68480000-d4bc-11e9-865e-a70f1b132a69.png" width="100%">
</a>
</p>

The first item is the name of the program being executed, in our case, it's an absolute path to `node`.

In Deno, you use `Deno.args` instead to retrive command line arguments:

<p>
<a href="./examples/args.ts">
<img alt="run deno example" src="https://user-images.githubusercontent.com/8784712/64687185-9a596200-d4bc-11e9-8cf7-6868b29fdde4.png" width="100%">
</a>
</p>

Note that there're only three items in the array, **the path to `deno` executable is not included**. To get path to Deno executable use [`Deno.execPath()`](https://deno.land/typedoc/index.html#execpath). The first item is also just a relative path.

## Spawn a subprocess

Node.js's [`child_process.spawn()`](https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_child_process_spawn_command_args_options) method is used to spawn a new process:

```js
const { spawn } = require('child_process')

const p = spawn('ls', ['./examples'])

p.on('close', code => {
  // completed with status `code`
})

p.stdout.on('data', data => {
  process.stdout.write(data)
})

p.stderr.on('data', data => {
  process.stderr.write(data)
})
```

Node.js by default creates a pipe between the child process and the parent process for parent-child communication.

The Deno equivalent is [`Deno.run`](https://deno.land/typedoc/index.html#run):

```ts
const p = Deno.run({
  args: ['ls', './examples']
})

// await its completion
const code = await p.status()
```

In Deno the subprocess is inherited from parent process by default, if you want it to work like the default behavior in Node.js you can use `piped` option:

```ts
const p = Deno.run({
  args: ['ls', './examples'],
  stdout: 'piped',
  stderr: 'piped'
})

const code = await p.status()

if (code === 0) {
  const rawOutput = await p.output()
  await Deno.stdout.write(rawOutput)
} else {
  const rawError = await p.stderrOutput()
  await Deno.stderr.write(rawError)
}
```

## Hashing algorithms

In Node.js:

```js
const crypto = require('crypto')

// sha1
console.log(
  crypto
    .createHash('sha1')
    .update('hello world')
    .digest('hex')
)

// md5
console.log(
  crypto
    .createHash('md5')
    .update('hello world')
    .digest('hex')
)
```

In Deno:

```js
import { Hash, encode } from 'https://deno.land/x/checksum/mod.ts'

// sha1
console.log(new Hash('sha1').digest(encode('hello world')).hex())

// md5
console.log(new Hash('md5').digest(encode('hello world')).hex())
```
