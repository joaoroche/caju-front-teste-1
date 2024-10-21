import { renderHook, act } from '@testing-library/react-hooks';
import { usePutRegistrations } from './usePutRegistrations';
import { putRegistrations } from '~/services/registrations/put';
import { AxiosError } from 'axios';

jest.mock('~/services/registrations/put');

describe('usePutRegistrations', () => {
  it('should initialize with correct default states', () => {
    const { result } = renderHook(() => usePutRegistrations());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should handle successful mutation', async () => {
    const mockPutRegistrations = putRegistrations as jest.Mock;
    mockPutRegistrations.mockResolvedValueOnce({});

    const onSuccess = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() => usePutRegistrations());

    act(() => {
      result.current.mutateAsync({ payload: {}, onSuccess });
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should handle failed mutation', async () => {
    const mockPutRegistrations = putRegistrations as jest.Mock;
    const mockError = new AxiosError('Error');
    mockPutRegistrations.mockRejectedValueOnce(mockError);

    const onError = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() => usePutRegistrations());

    act(() => {
      result.current.mutateAsync({ payload: {}, onError });
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockError);
    expect(onError).toHaveBeenCalled();
  });
});