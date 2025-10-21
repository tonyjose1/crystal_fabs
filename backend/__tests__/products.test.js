import request from 'supertest';
import app from '../app';

describe('GET /api/products', () => {
  it('should return 200 OK and an array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.products)).toBe(true);
  });
});
