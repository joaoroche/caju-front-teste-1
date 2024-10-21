import { AxiosError } from "axios";
import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Loading } from "~/components/Loading";
import { Error } from "~/components/Error";


import { useGetQueryParams } from "~/hooks/window/useGetQueryParams";
import { useGetRegistrations } from "~/hooks/registrations/get/useGetRegistrations";

import * as S from "./styles";

const DashboardPage = () => {
  const { getParam } = useGetQueryParams();
  const { data, loading, isError, error, refetch } = useGetRegistrations({ 
    params: { cpf: getParam("cpf") || "" }
    });

  return (
    <S.Container>
      {loading ? <Loading /> : null}
      {isError ? <Error error={error as AxiosError}/> : null}
      {data ? (
        <>
          <SearchBar />
          <Columns registrations={data} refetch={refetch} />
        </>
      ) : null}
    </S.Container>
  );
};
export default DashboardPage;
