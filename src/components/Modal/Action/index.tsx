/* eslint-disable jsx-a11y/no-autofocus */
import { useEffect, useRef } from "react";
import { PutRegistrationsParams } from "~/services/registrations/put/putRegistrationsType";
import Button from "~/components/Buttons";
import * as Styles from "./styles";

type ModalApproveProps = {
  isOpen: boolean;
  message: string;
  title: string;
  onClose: () => void;
  onApprove: (params: PutRegistrationsParams) => void;
  onReject: (params: PutRegistrationsParams) => void;
};

const ActionModal = ({
  isOpen,
  title,
  message,
  onClose,
  onApprove,
  onReject,
}: ModalApproveProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const trapFocus = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      if (modalRef.current) {
        firstElement?.focus();
      }

      document.addEventListener('keydown', trapFocus);

      return () => {
        document.removeEventListener('keydown', trapFocus);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    isOpen ? (
      <Styles.ModalOverlay
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-message"
        onClick={handleClose}
      >
        <Styles.ModalBox onClick={(e) => e.stopPropagation()}>
          <Styles.ModalTitle id="modal-title">{title}</Styles.ModalTitle>
          <p id="modal-message" aria-live="polite">{message}</p>
          <Styles.ButtonContainer>
            <Button ref={confirmButtonRef} onClick={onApprove} autoFocus>
              Confirmar
            </Button>
            <Styles.CancelButton onClick={onReject}>Cancelar</Styles.CancelButton>
          </Styles.ButtonContainer>
        </Styles.ModalBox>
      </Styles.ModalOverlay>
    ) : null
  );
};

export default ActionModal;
