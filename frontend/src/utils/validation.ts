import * as Yup from 'yup';
import { parse, isAfter } from 'date-fns';

export function getCreateClassValidation(): Yup.ObjectSchema {
  const schema = Yup.object().shape({
    whatsapp: Yup.string().min(11, 'Digite um numero de whatsapp valido!'),
    bio: Yup.string().required('Biografia e obrigatório!'),
    subject: Yup.string().required('Selecione uma Materia!'),
    cost: Yup.string()
      .required('Coloque o preço da hora aula!')
      .test('validate', 'Digite o preço da aula corretamente!', function (
        value,
      ) {
        if (value?.slice(-1) === ',') {
          return false;
        }
        return true;
      }),

    schedules: Yup.array().of(
      Yup.object()
        .shape({
          week_day: Yup.string().required(
            'Selecione um dia da semana para sua aula!',
          ),
          froM: Yup.string()
            .required('Coloque o horário de inicio da aula!')
            .min(5, 'Coloque um horário de inicio valido!'),
          to: Yup.string()
            .required('Coloque o horário de termino da aula!')
            .min(5, 'Coloque um horário de termino valido!'),
        })
        .test(
          'time test',
          'Coloque todos os horários na ordem certa!',
          function (value) {
            if (value?.froM && value.to) {
              const time_1 = parse(value?.froM, 'HH:mm', new Date());
              const time_2 = parse(value?.to, 'HH:mm', new Date());
              if (isAfter(time_1, time_2)) {
                return false;
              }
              return true;
            }
            return false;
          },
        ),
    ),
  });

  return schema;
}

export function getUpdateClassValidation(): Yup.ObjectSchema {
  const schema = Yup.object().shape({
    subject: Yup.string().required('Selecione uma Materia!'),
    cost: Yup.string()
      .required('Coloque o preço da hora aula!')
      .test('validate', 'Digite o preço da aula corretamente!', function (
        value,
      ) {
        if (value?.slice(-1) === ',') {
          return false;
        }
        return true;
      }),

    schedules: Yup.array().of(
      Yup.object()
        .shape({
          week_day: Yup.string().required(
            'Selecione um dia da semana para sua aula!',
          ),
          froM: Yup.string()
            .required('Coloque o horário de inicio da aula!')
            .min(5, 'Coloque um horário de inicio valido!'),
          to: Yup.string()
            .required('Coloque o horário de termino da aula!')
            .min(5, 'Coloque um horário de termino valido!'),
        })
        .test(
          'time test',
          'Coloque todos os horários na ordem certa!',
          function (value) {
            if (value?.froM && value.to) {
              const time_1 = parse(value?.froM, 'HH:mm', new Date());
              const time_2 = parse(value?.to, 'HH:mm', new Date());
              if (isAfter(time_1, time_2)) {
                return false;
              }
              return true;
            }
            return false;
          },
        ),
    ),
  });

  return schema;
}

export function getUpdateUserValidation(): Yup.ObjectSchema {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome e obrigatório!'),
    last_name: Yup.string().required('Sobrenome e obrigatório!'),
    email: Yup.string()
      .required('Email e obrigatório!')
      .email('Digite um email valido!'),
  });

  return schema;
}
export function getUpdateProffyValidation(): Yup.ObjectSchema {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome e obrigatório!'),
    last_name: Yup.string().required('Sobrenome e obrigatório!'),
    whatsapp: Yup.string().min(11, 'Digite um numero de whatsapp valido!'),
    bio: Yup.string().required('Biografia e obrigatório!'),
    email: Yup.string()
      .required('Email e obrigatório!')
      .email('Digite um email valido!'),
  });

  return schema;
}

export function getPasswordValidation(): Yup.ObjectSchema {
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
