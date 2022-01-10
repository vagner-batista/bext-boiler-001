import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import InputMask from "react-input-mask";
import { Capitalize } from "lib/helpers";
import { useState } from "react";

const maxNameL = 200;
const maxNumberL = 10;
const defaultFreeTextLength = 100;
const numericalOptionalChars = { 9: "[0-9]", "?": "[0-9]" };
const textOptionalChars = { 9: "[0-9]", "?": "." };
const getGenericMaskFromSize = (size) => new Array(size).join("?");
const getGenericNumberPatternFromSize = (size) => RegExp(`[\\d]{${size}}`);
const getGenericTextPatternFromSize = (size) => RegExp(`(.){${size}}`);

const validators = {
  cpf: {
    mask: "999.999.999-9?",
    pattern: /[\d]{3}.[\d]{3}.[\d]{3}-[\d]{1,2}/,
    optionalChars: numericalOptionalChars,
  },
  tel: {
    pattern: /[(][\d]{2}[)]\s[\d]{4}\s[\d]{4}/,
    mask: "(99) 9999 9999",
    optionalChars: numericalOptionalChars,
  },
  cel: {
    optionalChars: numericalOptionalChars,
    pattern: /[(][\d]{2}[)][\s][\d]{3}\s[\d]{2}\s[\d]{4}/,
    mask: "(99) 999 99 9999",
  },
  number: {
    optionalChars: numericalOptionalChars,
    pattern: /([0-9]*)/,
    mask: getGenericMaskFromSize(maxNumberL),
  },
  cnpj: {
    pattern: /[\d]{2}.[\d]{3}.[\d]{3}\/[\d]{4}-[\d]{1,2}/,
    mask: "99.999.999/9999-9?",
    optionalChars: numericalOptionalChars,
  },
  email: {
    pattern:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    mask: new Array(300).join("?"),
    optionalChars: textOptionalChars,
  },
  name: {
    pattern: /^(?=.*[a-z])(?=.*\s)(?=.*[A-Z])[a-zA-Z\d\w\W]{6,}$/,
    mask: getGenericMaskFromSize(maxNameL),
    optionalChars: textOptionalChars,
  },
  cep: {
    pattern: /[\d]{5}-[\d]{3}/,
    mask: "99999-999",
    optionalChars: numericalOptionalChars,
  },
  freeText: {
    pattern: /(.*)/,
    mask: getGenericMaskFromSize(defaultFreeTextLength),
    optionalChars: textOptionalChars,
  },
  password: {
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    mask: getGenericMaskFromSize(50),
    optionalChars: textOptionalChars,
  },
};

const customSizeValidators = {
  freeText: (size, validator) => ({
    ...validator,
    mask: getGenericMaskFromSize(size + 1),
  }),
  name: (size, validator) => ({
    ...validator,
    mask: getGenericMaskFromSize(size + 1),
  }),
  number: (size, validator) => ({
    ...validator,
    mask: getGenericMaskFromSize(size + 1),
  }),
};

/*

*/

export default function TextInput(props) {
  const {
    type = "freeText",
    name,
    label,
    required = "Campo obrigatório",
    register,
    errors,
    maskChar = false,
    fullWidth = true,
    maxLength = false,
    helper = false,
    customValidator = false,
    muiProps = {},
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const tooglePassword = () => setShowPassword(!showPassword);
  const passwordVisibilityProps = {
    // <-- This is where the toggle button is added.
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={tooglePassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  };

  if (type === "password" && false)
    return (
      <TextField
        InputProps={passwordVisibilityProps}
        type={showPassword ? "text" : "password"}
        {...register(name, {
          required: required,
          pattern: validators.password,
        })}
        fullWidth={fullWidth || false}
        error={errors.hasOwnProperty(name) ? true : false}
        label={label || Capitalize(name)}
        id={name}
        helperText={
          errors.hasOwnProperty(name)
            ? "Senhas devem conter no mínimo 8 caracteres, incluindo número, letra maiúscula, minúscula e caracter especial"
            : ""
        }
        {...muiProps}
      />
    );

  const validator =
    customValidator !== false
      ? customValidator
      : type && Object.keys(validators).includes(type)
      ? validators[type]
      : validators.freeText;

  if (maxLength && Object.keys(customSizeValidators).includes(type))
    Object.assign(validator, customSizeValidators[type](maxLength, validator));

  return (
    <InputMask
      mask={validator.mask}
      formatChars={validator.optionalChars || textOptionalChars}
      maskChar={maskChar ? true : false}
      {...register(name, { required: required, pattern: validator.pattern })}
    >
      {() => (
        <TextField
          name={name}
          fullWidth={fullWidth || false}
          error={errors.hasOwnProperty(name) ? true : false}
          id={name}
          label={label || Capitalize(name)}
          type={type === "password" && !showPassword ? "password" : "text"}
          helperText={
            errors.hasOwnProperty(name)
              ? errors[name]?.message
                ? errors[name].message
                : type === "email"
                ? "Exemplo: joaodasilva@gmail.com"
                : `Formato: ${validator.mask.slice(0, 20)}`
              : helper || ""
          }
          {...muiProps}
          InputProps={type === "password" ? passwordVisibilityProps : {}}
        />
      )}
    </InputMask>
  );
}
