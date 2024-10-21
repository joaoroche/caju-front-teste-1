import { AxiosError } from "axios";
import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Loading } from "~/components/Loading";
import { Error } from "~/components/Error";

import { useGetRegistrations } from "~/hooks/registrations/get/useGetRegistrations";
import { useGetQueryParams } from "~/hooks/window/useGetQueryParams";

import * as S from "./styles";

const DashboardPage = () => {
  const queryParams = useGetQueryParams();
  const { data, loading, isError, error } = useGetRegistrations({ 
    params: { cpf: queryParams.get("cpf") || "" }
    });

  return (
    <S.Container>
      {loading ? <Loading /> : null}
      {isError ? <Error error={error as AxiosError}/> : null}
      {data ? (
        <>
          <SearchBar />
          <Columns registrations={data} />
        </>
      ) : null}
    </S.Container>
  );
};
export default DashboardPage;
