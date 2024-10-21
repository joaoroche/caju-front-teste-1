import { renderHook } from '@testing-library/react-hooks';
import { useGetQueryParams } from './useGetQueryParams';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('useGetQueryParams', () => {
  it('should parse query parameters into an object', () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: '?param1=value1&param2=value2',
    });

    const { result } = renderHook(() => useGetQueryParams());

    expect(result.current.params).toEqual({
      param1: 'value1',
      param2: 'value2',
    });
  });

  it('should return null for missing query parameters', () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: '?param1=value1',
    });

    const { result } = renderHook(() => useGetQueryParams());

    expect(result.current.getParam('param2')).toBeNull();
  });

  it('should retrieve the correct value for a given query parameter', () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: '?param1=value1&param2=value2',
    });

    const { result } = renderHook(() => useGetQueryParams());

    expect(result.current.getParam('param1')).toBe('value1');
    expect(result.current.getParam('param2')).toBe('value2');
  });

  it('should handle empty query parameters', () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: '',
    });

    const { result } = renderHook(() => useGetQueryParams());

    expect(result.current.params).toEqual({});
    expect(result.current.getParam('param1')).toBeNull();
  });
});