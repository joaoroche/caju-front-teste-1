import { render, screen } from "@testing-library/react";
import { useGetRegistrations } from "~/hooks/registrations/get/useGetRegistrations";
import { useGetQueryParams } from "~/hooks/window/useGetQueryParams";
import DashboardPage from ".";
import { AxiosError } from "axios";
import { useHistory } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));


jest.mock("~/hooks/registrations/get/useGetRegistrations");
jest.mock("~/hooks/window/useGetQueryParams");

const mockedUseGetQueryParams = useGetQueryParams as jest.Mock;
const mockedUseGetRegistrations = useGetRegistrations as jest.Mock;

describe("DashboardPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useHistory as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render Loading component when data is loading", () => {
    mockedUseGetQueryParams.mockReturnValue({
      getParam: jest.fn().mockReturnValue("some-cpf"),
    });
    mockedUseGetRegistrations.mockReturnValue({
      loading: true,
      isError: false,
      data: null,
    });

    render(<DashboardPage />);

    expect(screen.getByText("Carregando, aguarde um momento...")).toBeInTheDocument();
  });

  it("should render Error component when there is an error", () => {
    const error = { message: "Something went wrong" } as AxiosError;
    mockedUseGetQueryParams.mockReturnValue({
      getParam: jest.fn().mockReturnValue("some-cpf"),
    });
    mockedUseGetRegistrations.mockReturnValue({
      loading: false,
      isError: true,
      error,
      data: null,
    });

    render(<DashboardPage />);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("should render SearchBar and Columns when data is successfully fetched", () => {
    const mockData = [{
      "admissionDate": "22/10/2023",
      "email": "luiz@caju.com.br",
      "employeeName": "Luiz Filho",
      "status": "REVIEW",
      "cpf": "56642105087",
      "id": "3"
    }];
    mockedUseGetQueryParams.mockReturnValue({
      getParam: jest.fn().mockReturnValue("some-cpf"),
    });
    mockedUseGetRegistrations.mockReturnValue({
      loading: false,
      isError: false,
      data: mockData,
      refetch: jest.fn(),
    });

    render(<DashboardPage />);

    expect(screen.getByText("luiz@caju.com.br")).toBeInTheDocument();
    expect(screen.getByText("Luiz Filho")).toBeInTheDocument(); 
  });
});
