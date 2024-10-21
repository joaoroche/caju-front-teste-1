import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

type Props = {
  data: {
    employeeName: string;
    email: string;
    admissionDate: string;
  };
};

const RegistrationCard = (props: Props) => {
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
        <ButtonSmall
          bgcolor="rgb(255, 145, 154)"
          aria-label={`Reprovar ${props.data.employeeName}`}
          data-testid="disapprove-button"

        >
          Reprovar
        </ButtonSmall>

        <ButtonSmall
          bgcolor="rgb(155, 229, 155)"
          aria-label={`Aprovar ${props.data.employeeName}`}
          data-testid="approve-button"
        >
          Aprovar
        </ButtonSmall>

        <ButtonSmall
          bgcolor="#ff8858"
          aria-label={`Revisar novamente ${props.data.employeeName}`}
          data-testid="review-button"
        >
          Revisar novamente
        </ButtonSmall>

        <HiOutlineTrash
          role="button"
          aria-label={`Remover ${props.data.employeeName}`}
          tabIndex={0}
          data-testid="delete-icon"
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
