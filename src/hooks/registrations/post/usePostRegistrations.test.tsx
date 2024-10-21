import { renderHook, act } from '@testing-library/react-hooks';
import { AxiosError, AxiosHeaders } from 'axios';
import { postRegistrations } from '~/services/registrations/post';
import { PostRegistrationsParams } from '~/services/registrations/post/postRegistrationsType';
import { usePostRegistrations } from './usePostRegistrations';

jest.mock('~/services/registrations/post');
const mockedPostRegistrations = postRegistrations as jest.MockedFunction<typeof postRegistrations>;

describe('usePostRegistrations', () => {
  const mockPayload: PostRegistrationsParams['payload'] = {
    id: '1',
    status: 'active',
    employeeName: 'John Doe',
    email: 'johndow@gmail.com',
    cpf: '12345678900',
    admissionDate: '18/05/2024',
  };

  it('should successfully post registration and handle success callback', async () => {
    const mockOnSuccess = jest.fn();

    mockedPostRegistrations.mockResolvedValueOnce({
      data: {
        id: '1',
        status: 'active',
        employeeName: 'John Doe',
        email: 'johndow@gmail.com',
        cpf: '12345678900',
        admissionDate: '18/05/2024',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new AxiosHeaders()
      },
    });

    const { result } = renderHook(() => usePostRegistrations());

    await act(async () => {
      await result.current.mutateAsync({
        payload: mockPayload,
        onSuccess: mockOnSuccess,
      });
    });

    expect(mockOnSuccess).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('should handle error correctly and trigger error callback', async () => {
    const mockError = new AxiosError('Failed to post registration');
    const mockOnError = jest.fn();

    mockedPostRegistrations.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => usePostRegistrations());

    await act(async () => {
      await result.current.mutateAsync({
        payload: mockPayload,
        onError: mockOnError,
      });
    });

    expect(mockOnError).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockError);
    expect(result.current.loading).toBe(false);
  });
});
