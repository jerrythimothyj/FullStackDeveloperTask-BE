import supertest from "supertest"
import app from "./index"

const request = supertest(app)

it('gets the details of jerrythimothy users', async done => {
  const response = await request.post('/api/search').send({ type: 'users', text: 'jerrythimothy', per_page: 9, page: 1 })
  expect(response.status).toBe(200)
  expect(response.body.total_count).toEqual(2)
  done()
})

it('throws validation of 400', async done => {
  const response = await request.post('/api/search').send({ type: 'users1', text: 'jerrythimothy', per_page: 9, page: 1 })
  expect(response.status).toBe(400)
  done()
})

it('throws validation of 500', async done => {
  const response = await request.post('/api/search').send({ type: 'users', text: 'jerrythimothy', per_page: 9, page: 999999 })
  expect(response.status).toBe(500)
  done()
})

it('should be able to clear the cache', async done => {
  const response = await request.delete('/api/clear-cache')
  expect(response.status).toBe(200)
  done()
})