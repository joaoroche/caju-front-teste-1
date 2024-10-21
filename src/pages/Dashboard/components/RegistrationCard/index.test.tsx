import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePutRegistrations } from '~/hooks/registrations/put/usePutRegistrations';
import { useDeleteRegistrations } from '~/hooks/registrations/delete/useDeleteRegistrations';
import { toast } from 'react-toastify';
import RegistrationCard from '.';

// Mocking hooks and toast
jest.mock('~/hooks/registrations/put/usePutRegistrations');
jest.mock('~/hooks/registrations/delete/useDeleteRegistrations');
jest.mock('react-toastify');

const mockRefetch = jest.fn();
const mockRegistrationData = {
  id: '1',
  employeeName: 'John Doe',
  email: 'john@example.com',
  admissionDate: '2024-10-21',
  status: 'REVIEW',
  cpf: '123.456.789-00',
};

const setup = (props = {}) => {
  return render(<RegistrationCard data={mockRegistrationData} refetch={mockRefetch} {...props} />);
};

describe('RegistrationCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePutRegistrations as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue(undefined),
      error: null,
    });
    (useDeleteRegistrations as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue(undefined),
      error: null,
    });
  });

  test('renders the RegistrationCard with employee details', () => {
    setup();

    expect(screen.getByLabelText('Nome do colaborador')).toHaveTextContent('John Doe');
    expect(screen.getByLabelText('Email')).toHaveTextContent('john@example.com');
    expect(screen.getByLabelText('Data de admissão')).toHaveTextContent('2024-10-21');
  });

  test('opens the approval modal when "Aprovar" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByTestId('approve-button'));

    expect(screen.getByText('Aprovar colaborador')).toBeInTheDocument();
    expect(screen.getByText('Deseja aprovar o colaborador John Doe?')).toBeInTheDocument();
  });

  test('handles approval correctly', async () => {
    const { getByTestId } = setup();

    fireEvent.click(getByTestId('approve-button'));
    
    const approveModalButton = await screen.findByText('Aprovar');

    fireEvent.click(approveModalButton);

    const confirmModalButton = await screen.findByTestId('confirm-button');

    const clicked = fireEvent.click(confirmModalButton);

    await waitFor(async () => {
      expect(clicked).toBeTruthy();
    })
  });

  test('opens the disapproval modal when "Reprovar" button is clicked', () => {
    setup();

    fireEvent.click(screen.getByTestId('disapprove-button'));

    expect(screen.getByText('Reprovar colaborador')).toBeInTheDocument();
    expect(screen.getByText('Deseja reprovar o colaborador John Doe?')).toBeInTheDocument();
  });

  test('handles disapproval correctly', async () => {
    const { getByTestId } = setup();

    fireEvent.click(getByTestId('disapprove-button'));

    const approveModalButton = await screen.findByText('Reprovar');
    fireEvent.click(approveModalButton);

    const confirmModalButton = await screen.findByTestId('confirm-button');

    const clicked = fireEvent.click(confirmModalButton);

    await waitFor(async () => {
      expect(clicked).toBeTruthy();
    })
  });

  test('handles review correctly', async () => {
    const { getByTestId } = render(<RegistrationCard data={{
      admissionDate: '2024-10-21',
      cpf: '123.456.789-00',
      email: 'joehdoe@gmail.com',
      employeeName: 'John Doe',
      id: '1',
      status: 'APPROVED',
    }} refetch={mockRefetch}  />)

    fireEvent.click(getByTestId('review-button'));

    const approveModalButton = await screen.findByText('Revisar novamente');
    fireEvent.click(approveModalButton);

    const confirmModalButton = await screen.findByTestId('confirm-button');

    const clicked = fireEvent.click(confirmModalButton);

    await waitFor(async () => {
      expect(clicked).toBeTruthy();
    })
  });

  test('opens the delete modal when delete icon is clicked', async () => {
    setup();

    fireEvent.click(screen.getByTestId('delete-icon'));

    const confirmModalButton = await screen.findByTestId('confirm-button');

    const clicked = fireEvent.click(confirmModalButton);

    await waitFor(async () => {
      expect(clicked).toBeTruthy();
    })
  });
});
