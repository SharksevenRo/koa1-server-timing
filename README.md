# koa1-server-timing

 Koa1 [`Server-Timing`](http://wicg.github.io/server-timing/) header middleware.

## Installation

```bash
$ npm install koa1-server-timing
```

## API

```js
const Koa = require('koa');
const app = new Koa();
app.use(require('koa-server-timing')({ total: true /* default to NODE_ENV !== 'production' */ }));

this.state.timings.startSpan('A Task description', 'taskSlug' /* optional, will be created a-task-description, if missed */)

/* ... do some long task to measure here */
this.state.timings.stopSpan('A Task description' /* or 'taskSlug' or return from startSpan */);

```

### Options

* `total` where do you want to see total processing time in Server-Timings

## Example

```js
const timings = require('koa1-server-timing');
const koa = require('koa');
const db = require('./mongoose');
const app = koa();

app.use(timings());

app.listen(3000);

console.log('listening on port 3000');

app.use(function * () {
    this.state.timings.startSpan('Query DB for User object');
    const user = await db.User.findOne({ email: 'test@test.com' }).exec();
    this.state.timings.stopSpan('Query DB for User object'); // or just pass return of startSpan (it will be a slug)
})

```

