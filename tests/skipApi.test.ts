import { describe, it, expect, vi } from 'vitest';
import { fetchSkips } from '../src/services/skipApi';

describe('fetchSkips', () => {
  it('returns skip options on success', async () => {
    const mockData = [{ id: '1', size: 'Small', price: 10 }]; // Note: service maps price from price_before_vat
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([
      { id:1,size:4,price_before_vat:278,allows_heavy_waste:true }
    ]) }) as any);
    const result = await fetchSkips('X','Y');
    expect(result).toEqual([{ id:'1', size:'4m³', price:278, description:'Allows heavy waste', imageUrl:undefined }]);
  });
  it('throws error on failure', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok:false }) as any);
    await expect(fetchSkips('X','Y')).rejects.toThrow('Failed to load skip data');
  });
});