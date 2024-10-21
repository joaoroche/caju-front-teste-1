import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useCallback, useState } from "react";
import { validateName } from "~/utils/functions/validateName";
import { validateEmail } from "~/utils/functions/validateEmail";
import { extractNumbers } from "~/utils/functions/extractNumbers";
import { validateCPF } from "~/utils/functions/validateCPF";
import { formatCpf } from "~/utils/functions/formatCPF";
import { usePostRegistrations } from "~/hooks/registrations/post/usePostRegistrations";
import { toast } from "react-toastify";
import { randomId } from "~/utils/functions/randomId";
import { formatDate } from "~/utils/functions/formatDate";

const NewUserPage = () => {
  const history = useHistory();
  const { mutateAsync, error, loading } = usePostRegistrations()
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    admissionDate: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const validateForm = useCallback(() => {
    const newErrors = { name: "", email: "", cpf: "" };

    if (!validateName(form.name)) {
      newErrors.name = "O nome deve ter pelo menos duas letras, um espaço e não começar com número.";
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Email inválido.";
    }

    if (!validateCPF(extractNumbers(form.cpf))) {
      newErrors.cpf = "CPF inválido. Deve ter 11 dígitos.";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.cpf;
  }, [form]);

   const handleSubmit = () => {
    if (validateForm()) {
      mutateAsync({
        payload: {
          employeeName: form.name,
          email: form.email,
          cpf: extractNumbers(form.cpf),
          admissionDate: formatDate(form.admissionDate),
          id: randomId(),
          status: "REVIEW"
        },
        onError: () => {
          toast.error(error?.message || "Erro ao cadastrar usuário");
        },
        onSuccess: () => {
          toast.success("Usuário cadastrado com sucesso");
          goToHome();
        }
      })
    } 
    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "cpf" ? formatCpf(value) : value,
    }));
  };

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <TextField
          name="name"
          placeholder="Nome"
          label="Nome"
          value={form.name}
          onChange={handleInputChange}
          error={errors.name}
        />

        <TextField
          name="email"
          placeholder="Email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleInputChange}
          error={errors.email}
        />

        <TextField
          name="cpf"
          placeholder="CPF"
          label="CPF"
          value={form.cpf}
          onChange={handleInputChange}
          error={errors.cpf}
          maxLength={14}
        />

        <TextField
          name="admissionDate"
          label="Data de admissão"
          type="date"
          value={form.admissionDate}
          onChange={handleInputChange}
        />

        <Button onClick={handleSubmit} disable={loading}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
