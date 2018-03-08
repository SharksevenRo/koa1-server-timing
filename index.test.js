const Koa = require('koa');
const timings = require('./');
const Router = require('koa-router');
const request = require('supertest');

const app = new Koa();
const router = new Router();

app.on('error', (err) => {
  throw err;
});

app.use(timings({ total: true }));

router.get('/', function* () {
  this.body = 'This is test body';
  // just waiting for 1000 ms
  yield new Promise((resolve) => setTimeout(resolve, 1000));
})

router.get('/metric', function* () {
  this.body = 'This is test body 2';
  const slug = this.state.timings.startSpan('Another 1s task');
  // just waiting for 1000 ms
  yield new Promise((resolve) => setTimeout(resolve, 500));
  this.state.timings.stopSpan(slug);
})

router.get('/badslug', function* () {
  this.body = 'This is test body 2';
  const slug = this.state.timings.startSpan("This's staff To be Converted to slug");
  this.state.timings.stopSpan(slug);
})
app.use(router.routes());
app.listen(3000);

// describe('normal requests', () => {
//   let server;
//   beforeAll(() => {
//     server = app.listen();
//   });

//   afterAll(() => {
//     server.close();
//   });

//   test('should return Server-Timing with total in header', function * () {
//     yield request(server)
//       .get('/')
//       .expect('Server-Timing', /total/)
//       .expect(200)
//   })
    

//   test('should return Server-Timing with two metrics and description', function* () {
//     yield request(server)
//     .get('/metric')
//     .expect('Server-Timing', /total/)
//     .expect('Server-Timing', /Another 1s task/)
//     .expect(200)
//   });

//   test('should create correct slugs for Server-Timing metrics', function* () {
//     yield request(server)
//       .get('/badslug')
//       .expect('Server-Timing', /total/)
//       .expect('Server-Timing', /This's staff To be Converted to slug/)
//       .expect('Server-Timing', /thiss-staff-to-be-converted-to-slug/)
//       .expect(200)
//   });
    

//   test('should return time in seconds Server-Timing metrics', function* () {
//     yield request(server)
//       .get('/')
//       .expect('Server-Timing', /total;dur=1\./)
//       .expect(200)
//     });
// });
