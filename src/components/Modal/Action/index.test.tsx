import ActionModal from ".";
import { render, screen, } from "@testing-library/react";
import '@testing-library/jest-dom'; 

describe('<ActionModal {...props} />', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Title',
    message: 'Test Message',
    onClose: jest.fn(),
    onApprove: jest.fn(),
    onReject: jest.fn(),
  };

  const renderComponent = (props = {}) => {
    return render(<ActionModal {...defaultProps} {...props} />);
  };

  it('should render the modal when isOpen is true', () => {
    renderComponent();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    renderComponent({ isOpen: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should display the correct title and message', () => {
    renderComponent();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should call onClose when the overlay is clicked', () => {
    renderComponent();
    screen.getByRole('dialog').click();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should call onApprove when the confirm button is clicked', () => {
    renderComponent();
    screen.getByText('Confirmar').click();
    expect(defaultProps.onApprove).toHaveBeenCalled();
  });

  it('should call onReject when the cancel button is clicked', () => {
    renderComponent();
    screen.getByText('Cancelar').click();
    expect(defaultProps.onReject).toHaveBeenCalled();
  });

  it('should trap focus within the modal', () => {
    renderComponent();
    const confirmButton = screen.getByText('Confirmar');
    const cancelButton = screen.getByText('Cancelar');

    confirmButton.focus();
    expect(document.activeElement).toBe(confirmButton);

    cancelButton.focus();
    expect(document.activeElement).toBe(cancelButton);
  });
});