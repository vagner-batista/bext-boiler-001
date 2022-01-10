import InputMask from "react-input-mask";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";

/* 
working first on api
*/
const numberFormatChars = { 9: "[0-9]", "?": "[0-9]" };

export const validators = {
  cpf: {
    mask: "999.999.999-9?",
    pattern: /[\d]{3}.[\d]{3}.[\d]{3}-[\d]{1,2}/,
    formatChars: numberFormatChars,
  },
  phone: {
    pattern: /^[(][\d]{2}[)]\s[\d]{4}\s[\d]{4}$/,
    mask: "(99) 9999 9999",
    formatChars: numberFormatChars,
  },
  cel: {
    pattern: /[(][\d]{2}[)]\s[\d]{3}\s[\d]{2}\s[\d]{4}/,
    mask: "(99) 999 99 9999",
    formatChars: numberFormatChars,
  },
};

export const BaseTextInput = ({
  name,
  label,
  required,
  register,
  errors,
  maskChar,
  helper,
  mask,
  formatChars,
  pattern,
  onChange,
  ...props
}) => {
  return (
    <InputMask
      mask={mask}
      formatChars={formatChars}
      maskChar={maskChar}
      {...(register &&
        register(name, { required: required, pattern: pattern }))}
      onChange={onChange}
    >
      {() => (
        <TextField
          name={name}
          error={errors.hasOwnProperty(name) ? true : false}
          id={`id-text-field-${name}`}
          label={label}
          helperText={
            errors.hasOwnProperty(name)
              ? errors[name]?.message
                ? errors[name].message
                : "Campo obrigatório"
              : errors[name]?.type === "pattern"
              ? helper
              : ""
          }
          {...props}
        />
      )}
    </InputMask>
  );
};

export const Cpf = ({
  name = "cpf",
  label = "CPF",
  required = false,
  register = null,
  errors = null,
  maskChar = false,
  helper = "Apenas números",
  ...props
}) => {
  return (
    <BaseTextInput
      name={name}
      label={label}
      required={required}
      register={register}
      errors={errors}
      maskChar={maskChar}
      helper={helper}
      mask={validators.cpf.mask}
      formatChars={validators.cpf.formatChars}
      pattern={validators.cpf.pattern}
      {...props}
    />
  );
};

export const Telephone = ({
  name = "telefone",
  label = "Telefone",
  required = false,
  register = null,
  errors = null,
  maskChar = false,
  helper = "Apenas números",
  ...props
}) => {
  return (
    <BaseTextInput
      name={name}
      label={label}
      required={required}
      register={register}
      errors={errors}
      maskChar={maskChar}
      helper={helper}
      mask={validators.phone.mask}
      formatChars={validators.phone.formatChars}
      pattern={validators.phone.pattern}
      {...props}
    />
  );
};

export const Celular = ({
  name = "celular",
  label = "Celular",
  required = false,
  register = null,
  errors = null,
  maskChar = false,
  helper = "Apenas números",
  ...props
}) => {
  return (
    <BaseTextInput
      name={name}
      label={label}
      required={required}
      register={register}
      errors={errors}
      maskChar={maskChar}
      helper={helper}
      mask={validators.cel.mask}
      formatChars={validators.cel.formatChars}
      pattern={validators.cel.pattern}
      {...props}
    />
  );
};
