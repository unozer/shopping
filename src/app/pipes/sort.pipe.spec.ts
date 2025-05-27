import { SortPipe } from './sort.pipe';
import { Product } from '../model/product';

describe('SortPipe', () => {
  let pipe: SortPipe;
  const products: Product[] = [
    {
      id: 2, title: 'Banana', price: 5,
      category: '',
      image: ''
    },
    {
      id: 1, title: 'Apple', price: 3,
      category: '',
      image: ''
    },
    {
      id: 3, title: 'Carrot', price: 2,
      category: '',
      image: ''
    }
  ];

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort products by id', () => {
    const sorted = pipe.transform([...products], 'id');
    expect(sorted.map(p => p.id)).toEqual([1, 2, 3]);
  });

  it('should sort products by title', () => {
    const sorted = pipe.transform([...products], 'title');
    expect(sorted.map(p => p.title)).toEqual(['Apple', 'Banana', 'Carrot']);
  });

  it('should sort products by price', () => {
    const sorted = pipe.transform([...products], 'price');
    expect(sorted.map(p => p.price)).toEqual([2, 3, 5]);
  });

  it('should return empty array if input is undefined', () => {
    expect(pipe.transform(undefined as any, 'id')).toEqual([]);
  });

  it('should return empty array if input is null', () => {
    expect(pipe.transform(null as any, 'id')).toEqual([]);
  });

  it('should handle empty array', () => {
    expect(pipe.transform([], 'id')).toEqual([]);
  });

  it('should not mutate the original array', () => {
    const input = [...products];
    pipe.transform(input, 'id');
    expect(input).toEqual(products);
  });
});
