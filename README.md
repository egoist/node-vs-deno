# Node vs Deno

If you come from [Node.js](https://nodejs.org), you might find that a lot of things are very similar in [Deno](https://deno.land), here we show some features that Deno and Node.js have in common, it would be great for learning purpose.

Keeping updating..

## Table of Contents

<!-- toc -->

- [Built-in features](#built-in-features)
- [Command-line arguments](#command-line-arguments)
- [Spawn a subprocess](#spawn-a-subprocess)

<!-- tocstop -->

## Built-in features

In Node.js, most built-in features are exposed as CommonJS modules which you can use via `require` calls, while in Deno, they are exposed on the global namespace `Deno`.

For example, in Node.js you use `require('child_process').spawn` to start a subprocess, in Deno you can use `Deno.run` instead.

## Command-line arguments

`process.argv` represents command line arguments in Node.js which includes the binary name, run the example code:

![carbon.png](https://i.loli.net/2019/09/11/YyMZ6VhEmcsCk3q.png)

The first item is the name of the program being executed, in our case, it's an absolute path to `node`.

In Deno, you use `Deno.args` instead to retrive command line arguments:

<img src="https://i.loli.net/2019/09/11/LVQIT9nUxCJt5iH.png" width="100%">

Note that there're only three items in the array, **the path to `deno` executable is not included**, the second item is also just a relative path.

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
