import { renderHook, act } from '@testing-library/react-hooks'
import { useDeleteRegistrations } from './useDeleteRegistrations';
import { deleteRegistrations } from '~/services/registrations/delete';

jest.mock('~/services/registrations/delete');

describe('useDeleteRegistrations()', () => {
    it('should handle success correctly', async () => {
    const successResponse = { data: {}, status: 200, statusText: 'OK' };
    (deleteRegistrations as jest.Mock).mockResolvedValueOnce(successResponse);
    const onSuccess = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() => useDeleteRegistrations());
    const mutateAsync = result.current.mutateAsync;

    act(() => {
      mutateAsync({ id: '1', onSuccess });
    });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useDeleteRegistrations());
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should set loading state correctly during mutateAsync', async () => {
    const { result } = renderHook(() => useDeleteRegistrations());
    const mutateAsync = result.current.mutateAsync;

    act(() => {
      mutateAsync({ id: '1' });
    });

    expect(result.current.loading).toBe(true);
  });
});