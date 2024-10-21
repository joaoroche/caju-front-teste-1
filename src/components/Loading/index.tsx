import * as Styles from "./styles";

export const Loading = () => {
  return (
    <Styles.LoaderContainer datatest-id="loading" aria-live="assertive" aria-busy="true" role="alert">
      <Styles.VisuallyHiddenText>
        Carregando, aguarde um momento...
        </Styles.VisuallyHiddenText>
      <Styles.Spinner />
    </Styles.LoaderContainer>
  )
}
