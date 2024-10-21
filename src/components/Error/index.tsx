import { AxiosError } from "axios";
import * as Styles from "./styles";

export const Error = ({ error }: { error: AxiosError }) => {
  let errorMessage = 'Oops! Algo deu errado.';
  let errorDetails = '';

  if (error.response) {
    errorMessage = `Erro ${error.response.status}: ${error.response.statusText}`;
    errorDetails = JSON.stringify(error.response.data, null, 2);
  } else if (error.request) {
    errorMessage = 'Ops! Ocorreu um erro ao tentar se comunicar com o servidor.';
    errorDetails = error.request;
  } else {
    errorMessage = error.message;
  }

  return (
    <Styles.ErrorContainer
      role="alert"
      aria-live="assertive" 
      aria-atomic="true"
      data-testid="error-container" 
    >
      <Styles.ErrorTitle
        data-testid="error-title" 
      >
        Oops! Algo deu errado.
      </Styles.ErrorTitle>

      <Styles.ErrorMessage
        data-testid="error-message" 
      >
        {errorMessage}
      </Styles.ErrorMessage>

      {errorDetails && (
        <Styles.ErrorDetails
          data-testid="error-details" 
        >
          {errorDetails}
        </Styles.ErrorDetails>
      )}
    </Styles.ErrorContainer>
  );
};
