import { renderHook, act } from '@testing-library/react-hooks';
import { AxiosError } from 'axios';
import { getRegistrations } from '~/services/registrations/get';
import { GetRegistrationsParams } from '~/services/registrations/get/getRegistrationsType';
import { ReturnGetRegistrations } from '~/@types/registrations/get';
import { useGetRegistrations } from './useGetRegistrations';

jest.mock('~/services/registrations/get');
const mockedGetRegistrations = getRegistrations as jest.MockedFunction<typeof getRegistrations>;

describe('useGetRegistrations', () => {
  const mockParams: GetRegistrationsParams = {
    params: {
      cpf: '12345678900',
    },
  };

  const mockData: ReturnGetRegistrations['data'] = [
    {
      id: '1',
      status: 'active',
      employeeName: 'John Doe',
      email: 'johndow@gmail.com',
      cpf: '12345678900',
      admissionDate: '18/05/2024',
    },
  ];

  it('should fetch registrations and set the data correctly', async () => {
    mockedGetRegistrations.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useGetRegistrations(mockParams));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should handle errors correctly', async () => {
    const mockError = new AxiosError('Network Error');
    mockedGetRegistrations.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useGetRegistrations(mockParams));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(mockError);
    expect(result.current.isError).toBe(true);
  });

  it('should refetch data when params change', async () => {
    mockedGetRegistrations.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ params }) => useGetRegistrations({ params }),
      {
        initialProps: mockParams,
      }
    );

    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);

    const newParams: GetRegistrationsParams = {
      params: { cpf: '09876543210' },
    };

    mockedGetRegistrations.mockResolvedValueOnce({ data: mockData });

    act(() => {
      rerender({ params: newParams.params });
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
  });
});
