import { useForm } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import TextInput from "./text-input";
import { Capitalize } from "lib/helpers";
import { Cpf, Telephone, Celular } from "/lib/form-utils/text-input";
import theme from "styles/theme";
import { BaseTextInput } from "lib/form-utils/text-input";

export default function FormMaker() {
  const themeFormItemProps = {
    variant: "standard",
    fullWidth: true,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitMe = (data) => console.log(data);
  return (
    <Grid container spacing={2} direction="column">
      <form
        name="testeForm"
        id="testForm-id"
        method="post"
        action="/"
        onSubmit={handleSubmit(submitMe)}
      >
        <Grid item paddingTop={2}>
          <BaseTextInput
            name="base"
            label="base"
            required="Bas obrigatório"
            register={register}
            errors={errors}
            maskChar={false}
            helper="Text livre"
            mask={"???????????????????????????"}
            formatChars={{ "?": "." }}
            pattern={/^[w]*/}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item paddingTop={2}>
          <Cpf
            register={register}
            errors={errors}
            {...themeFormItemProps}
            required="CPF obrigatório"
          />
        </Grid>
        <Grid item paddingTop={2}>
          <Telephone
            register={register}
            errors={errors}
            {...themeFormItemProps}
            required="Telefone é obrigatório"
          />
        </Grid>
        <Grid item paddingTop={2}>
          <Celular
            register={register}
            errors={errors}
            {...themeFormItemProps}
            required="Celular é obrigatório"
          />
        </Grid>
        <Grid item paddingTop={2}>
          <Button
            type="submit"
            {...themeFormItemProps}
            variant="contained"
            fullWidth
          >
            Enviar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
