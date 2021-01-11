/* eslint-disable func-names */
import * as Yup from 'yup';
import { parse, isAfter, isValid } from 'date-fns';

interface ErrorProps {
  [key: string]: string;
}

export function getValidationErrors(err: Yup.ValidationError): ErrorProps {
  const errors: ErrorProps = {};

  err.inner.forEach((error) => {
    if (error.path)
      if (!errors[error.path]) {
        errors[error.path] = error.message;
      }
  });

  return errors;
}

export function setValidationSignUp(): Yup.AnyObjectSchema {
  return Yup.object().shape({
    email: Yup.string().email('Digite um email valido!'),
    password: Yup.string().min(8, 'Senha deve conter no mínimo 8 caracteres'),
    confirm_password: Yup.string()
      .nullable()
      .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
  });
}

export function setUpdateUserValidation(): Yup.AnyObjectSchema {
  return Yup.object().shape({
    name: Yup.string().required('Nome e obrigatório!'),
    last_name: Yup.string().required('Sobrenome e obrigatório!'),
    email: Yup.string()
      .required('Email e obrigatório!')
      .email('Digite um email valido!'),
  });
}
export function setUpdateProffyValidation(): Yup.AnyObjectSchema {
  return Yup.object().shape({
    name: Yup.string().required('Nome e obrigatório!'),
    last_name: Yup.string().required('Sobrenome e obrigatório!'),
    whatsapp: Yup.string().min(11, 'Numero de whatsapp invalido'),
    bio: Yup.string().required('Biografia e obrigatório!'),
    email: Yup.string()
      .required('Email e obrigatório!')
      .email('Digite um email valido!'),
  });
}

export function setUpdateClassValidation(): Yup.AnyObjectSchema {
  const schema = Yup.object().shape({
    subject: Yup.string().required('Selecione uma materia!'),
    cost: Yup.string()
      .required('Coloque o preço da hora aula!')
      .test('validate', 'Coloque o preço corretamente!', function (value) {
        if (value?.slice(-1) === ',') {
          return false;
        }
        return true;
      }),

    schedules: Yup.array().of(
      Yup.object().shape({
        week_day: Yup.number().test(
          'no selected subject',
          'Selecione um dia da semana',
          function (value) {
            if (value === 0) {
              return false;
            }
            return true;
          },
        ),
        froM: Yup.string()
          .required('Horário e obrigatório')
          .min(5, 'Horário invalido!')
          .test('test-time', 'Horário invalido', function (value) {
            if (value) {
              const time = parse(value, 'HH:mm', new Date());
              return isValid(time);
            }
            return false;
          }),
        to: Yup.string()
          .required('Horário e obrigatório')
          .min(5, 'Horário invalido!')
          .test('test-time-1', 'Horário invalido', function (value) {
            if (value) {
              const time = parse(value, 'HH:mm', new Date());
              return isValid(time);
            }
            return false;
          })
          .test('test-time-2', 'Horário invalido', function (value) {
            if (value) {
              const time_1 = parse(this.parent.froM, 'HH:mm', new Date());
              const time_2 = parse(this.parent.to, 'HH:mm', new Date());
              if (isAfter(time_1, time_2)) {
                return false;
              }
              return true;
            }
            return false;
          }),
      }),
    ),
  });

  return schema;
}

export function setPasswordValidation(): Yup.AnyObjectSchema {
  const schema = Yup.object().shape({
    new_password: Yup.string().min(
      8,
      'Senha deve conter no mínimo 8 caracteres',
    ),
    confirm_password: Yup.string()
      .nullable()
      .oneOf([Yup.ref('new_password'), null], 'Confirmação de senha incorreta'),
  });

  return schema;
}

export function setCreateClassValidation(): Yup.AnyObjectSchema {
  const schema = Yup.object().shape({
    whatsapp: Yup.string().min(11, 'Digite um numero de whatsapp valido!'),
    bio: Yup.string().required('Biografia e obrigatório!'),
    subject: Yup.string().required('Selecione uma materia!'),
    cost: Yup.string()
      .required('Coloque o preço da hora aula!')
      .test('validate', 'Coloque o preço corretamente!', function (value) {
        if (value?.slice(-1) === ',') {
          return false;
        }
        return true;
      }),

    schedules: Yup.array().of(
      Yup.object().shape({
        week_day: Yup.number().test(
          'no selected subject',
          'Selecione um dia da semana',
          function (value) {
            if (value === 0) {
              return false;
            }
            return true;
          },
        ),
        froM: Yup.string()
          .required('Horário e obrigatório')
          .min(5, 'Horário invalido!')
          .test('test-time', 'Horário invalido', function (value) {
            if (value) {
              const time = parse(value, 'HH:mm', new Date());
              return isValid(time);
            }
            return false;
          }),
        to: Yup.string()
          .required('Horário e obrigatório')
          .min(5, 'Horário invalido!')
          .test('test-time-1', 'Horário invalido', function (value) {
            if (value) {
              const time = parse(value, 'HH:mm', new Date());
              return isValid(time);
            }
            return false;
          })
          .test('test-time-2', 'Horário invalido', function (value) {
            if (value) {
              const time_1 = parse(this.parent.froM, 'HH:mm', new Date());
              const time_2 = parse(this.parent.to, 'HH:mm', new Date());
              if (isAfter(time_1, time_2)) {
                return false;
              }
              return true;
            }
            return false;
          }),
      }),
    ),
  });

  return schema;
}
