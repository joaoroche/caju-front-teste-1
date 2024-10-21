import { renderHook, act } from '@testing-library/react-hooks';
import { useSetQueryParams } from './useSetQueryParams';
import { useHistory } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

describe('useSetQueryParams', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useHistory as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the query params and call history.push with the updated search params', () => {
    const mockInitialSearch = '?foo=bar';
    Object.defineProperty(window, 'location', {
      value: {
        search: mockInitialSearch,
      },
      writable: true,
    });

    const { result } = renderHook(() => useSetQueryParams());

    act(() => {
      result.current.mutate({ key: 'newKey', value: 'newValue' });
    });

    const expectedSearch = 'foo=bar&newKey=newValue';

    expect(mockPush).toHaveBeenCalledWith({ search: expectedSearch });
  });

  it('should overwrite existing query param if the key already exists', () => {
    const mockInitialSearch = '?key1=value1';
    Object.defineProperty(window, 'location', {
      value: {
        search: mockInitialSearch,
      },
      writable: true,
    });

    const { result } = renderHook(() => useSetQueryParams());

    act(() => {
      result.current.mutate({ key: 'key1', value: 'updatedValue' });
    });

    const expectedSearch = 'key1=updatedValue';

    expect(mockPush).toHaveBeenCalledWith({ search: expectedSearch });
  });

  it('should add a query param if none exist', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '',
      },
      writable: true,
    });

    const { result } = renderHook(() => useSetQueryParams());

    act(() => {
      result.current.mutate({ key: 'key1', value: 'value1' });
    });

    const expectedSearch = 'key1=value1';

    expect(mockPush).toHaveBeenCalledWith({ search: expectedSearch });
  });
});
