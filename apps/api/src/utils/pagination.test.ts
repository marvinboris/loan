import { filter } from './pagination';
import { Request } from 'express';

describe('filter', () => {
  it('should return default pagination when no query params are provided', () => {
    const query = {};
    const result = filter(query);
    expect(result).toEqual([0, 99]); // page 1, show 100
  });

  it('should handle first page with custom show value', () => {
    const query = { _page: '1', _show: '10' };
    const result = filter(query);
    expect(result).toEqual([0, 9]);
  });

  it('should handle second page with custom show value', () => {
    const query = { _page: '2', _show: '15' };
    const result = filter(query);
    expect(result).toEqual([15, 29]);
  });

  it('should handle string numeric values', () => {
    const query = { _page: '3', _show: '20' };
    const result = filter(query);
    expect(result).toEqual([40, 59]);
  });

  it('should fallback to defaults when values are not numbers', () => {
    const query = { _page: 'invalid', _show: 'not-a-number' };
    const result = filter(query);
    expect(result).toEqual([0, 99]);
  });

  it('should handle zero page value by treating it as 1', () => {
    const query = { _page: '0', _show: '10' };
    const result = filter(query);
    expect(result).toEqual([0, 9]);
  });

  it('should handle negative page value by treating it as 1', () => {
    const query = { _page: '-5', _show: '10' };
    const result = filter(query);
    expect(result).toEqual([0, 9]);
  });

  it('should handle zero show value by using default', () => {
    const query = { _page: '2', _show: '0' };
    const result = filter(query);
    expect(result).toEqual([100, 199]); // Default show is 100
  });

  it('should handle negative show value by using default', () => {
    const query = { _page: '3', _show: '-10' };
    const result = filter(query);
    expect(result).toEqual([200, 299]); // Default show is 100
  });

  it('should handle decimal values by truncating them', () => {
    const query = { _page: '1.5', _show: '10.9' };
    const result = filter(query);
    expect(result).toEqual([0, 9]); // page 1, show 10
  });

  it('should handle very large page numbers', () => {
    const query = { _page: '1000000', _show: '10' };
    const result = filter(query);
    expect(result).toEqual([9999990, 9999999]);
  });
});
