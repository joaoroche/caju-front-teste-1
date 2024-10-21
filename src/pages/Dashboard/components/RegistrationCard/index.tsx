import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { usePutRegistrations } from "~/hooks/registrations/put/usePutRegistrations";
import { RegistrationProps } from "~/@types/registrations";
import { useDeleteRegistrations } from "~/hooks/registrations/delete/useDeleteRegistrations";

const STATUS_RENDER_APPROVED_AND_DISAPPROVED = ["REVIEW"]
const STATUS_RENDER_REVIEW = ["APPROVED", "REPROVED"]

type Props = {
  data: RegistrationProps;
  refetch?: () => void;
};

const RegistrationCard = (props: Props) => {
  const { mutateAsync: updatedRegistration } = usePutRegistrations()
  const { mutateAsync: deleteRegistration } = useDeleteRegistrations()

  const handleApprove = async () => {
    await updatedRegistration({ 
      payload: {
        ...props.data,
        status: "APPROVED"
      },
      onSuccess: () => props.refetch && props.refetch()
    },);
  }

  const handleDisapprove = async () => {
    await updatedRegistration({ 
      payload: {
        ...props.data,
        status: "REPROVED"
      },
      onSuccess: () => props.refetch && props.refetch()
    });
  }

  const handleReview = async () => {
    await updatedRegistration({ 
      payload: {
        ...props.data,
        status: "REVIEW"
      },
      onSuccess: () => props.refetch && props.refetch()
    });
  }

  const handleDelete = async () => {
    await deleteRegistration({ 
      id: props.data.id,
      onSuccess: () => props.refetch && props.refetch()
    });
  }

  // - O botão de `Reprovar` e `Aprovar` só deve aparecer em admissões com o status `REVIEW` 
const renderApprovedAndDisapprovedButtons = STATUS_RENDER_APPROVED_AND_DISAPPROVED.includes(props.data.status)

const renderReviewButton = STATUS_RENDER_REVIEW.includes(props.data.status)

  return (
    <S.Card data-testid="registration-card">
      <S.IconAndText>
        <HiOutlineUser aria-hidden="true" />
        <h3 aria-label="Nome do colaborador">{props.data.employeeName}</h3>
      </S.IconAndText>

      <S.IconAndText>
        <HiOutlineMail aria-hidden="true" />
        <p aria-label="Email">{props.data.email}</p>
      </S.IconAndText>

      <S.IconAndText>
        <HiOutlineCalendar aria-hidden="true" />
        <span 
          aria-label="Data de admissão">
            {props.data.admissionDate}
        </span>
      </S.IconAndText>

      <S.Actions>
        {renderApprovedAndDisapprovedButtons && (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              aria-label={`Reprovar ${props.data.employeeName}`}
              data-testid="disapprove-button"
              onClick={handleDisapprove}
            >
              Reprovar
            </ButtonSmall>

            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              aria-label={`Aprovar ${props.data.employeeName}`}
              data-testid="approve-button"
              onClick={handleApprove}
            >
              Aprovar
            </ButtonSmall>
          </>
        )}

        {renderReviewButton && (
          <ButtonSmall
            bgcolor="#ff8858"
            aria-label={`Revisar novamente ${props.data.employeeName}`}
            data-testid="review-button"
            onClick={handleReview}
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash
          role="button"
          aria-label={`Remover ${props.data.employeeName}`}
          tabIndex={0}
          data-testid="delete-icon"
          onClick={handleDelete}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
