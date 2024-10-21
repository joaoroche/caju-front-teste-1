
import { render, screen } from '@testing-library/react';
import Columns from '.';
import RegistrationCard from '../RegistrationCard';

jest.mock('../RegistrationCard', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mock RegistrationCard</div>),
}));

const mockRegistrations = [
  { id: 1, status: 'REVIEW' },
  { id: 2, status: 'APPROVED' },
  { id: 3, status: 'REPROVED' },
];

describe('Columns component', () => {
  it('should render RegistrationCard for registrations matching column status', () => {
    render(<Columns registrations={mockRegistrations} />);

    expect(RegistrationCard).toHaveBeenCalledTimes(3);
  });
  
  it('should render all columns with titles', () => {
    render(<Columns registrations={mockRegistrations} />);

    const columnTitles = screen.getAllByText(/Pronto para revisar|Aprovado|Reprovado/i);
    expect(columnTitles.length).toBe(3);
  });

});