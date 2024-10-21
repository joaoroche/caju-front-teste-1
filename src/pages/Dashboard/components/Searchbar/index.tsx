import { useCallback, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";

import { useSetQueryParams } from "~/hooks/window/useSetQueryParams";
import { extractNumbers } from "~/utils/functions/extractNumbers";

import * as S from "./styles";
import { useGetQueryParams } from "~/hooks/window/useGetQueryParams";

const REGEX_CPF_WITHOUT_MASK = /^\d{11}$/;

export const SearchBar = () => {
  const history = useHistory();
  const { getParam } = useGetQueryParams();
  const [search, setSearch] = useState(getParam("cpf") || "");
  const [searchError, setSearchError] = useState(false);

  const { mutate: searchUser } = useSetQueryParams();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueWithOnlyNumbers = extractNumbers(event.target.value);
      setSearch(valueWithOnlyNumbers);

      const isCpfValid = REGEX_CPF_WITHOUT_MASK.test(valueWithOnlyNumbers);
      setSearchError(!isCpfValid && valueWithOnlyNumbers.length > 0);

      if (isCpfValid) {
        return searchUser({ key: "cpf", value: valueWithOnlyNumbers });
      }

      searchUser({ key: "cpf", value: "" });
    },
    [searchUser]
  );

  
  return (
    <S.Container>
      <TextField  
        name="search"
        type="number"
        title="Buscar por CPF"
        placeholder="Digite um CPF válido" 
        data-slots="_"
        data-accept={/\d/}
        value={search}
        error={searchError ? "CPF inválido" : ""}
        onChange={handleSearch}
      />
      
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>

        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
