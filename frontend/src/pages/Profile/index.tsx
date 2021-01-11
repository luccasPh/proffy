import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiCamera } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getPhoneMask, getCurrencyMask, getTimeMask } from '../../utils/masks';
import { getSubjectOptions, getWeekDayOptions } from '../../utils/options';
import { useToast } from '../../hooks/toast';
import { useAuth, UserData } from '../../hooks/auth';
import TextMask from '../../components/TextMask';
import TextArea from '../../components/TextArea';
import SelectArea from '../../components/Select';
import Button from '../../components/Button';
import Input from './Input';
import Header from '../../components/Header';
import api from '../../services/api';
import {
  getUpdateClassValidation,
  getUpdateUserValidation,
  getUpdateProffyValidation,
  getPasswordValidation,
} from '../../utils/validation';

import warningIcon from '../../assets/images/icons/warning.svg';
import loadingImg from '../../assets/images/loading.svg';

import {
  Container,
  Content,
  FormSections,
  Section,
  Background,
  AvatarInput,
  AvatarLoading,
  FormLoading,
} from './styles';

interface ClassData {
  id: string;
  subject: string;
  cost: string;
  schedules: {
    id?: string;
    week_day: number;
    froM: string;
    to: string;
  }[];
  del_schedules?: string[];
}

interface PasswordData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const weekDayOptions = getWeekDayOptions();
const subjectOptions = getSubjectOptions();

const RegisterClass: React.FC = () => {
  const formUserRef = useRef<FormHandles>(null);
  const formClassRef = useRef<FormHandles>(null);
  const formPasswordRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, setUser, auth, signOut } = useAuth();

  const [userClass, setUserClass] = useState<ClassData>({} as ClassData);
  const [isDisabled, setIsDisabled] = useState(true);
  const [delSchedules, setDelSchedules] = useState<string[]>([]);
  const [showAvatar, setShowAvatar] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (auth.token && !user.id) {
      api
        .get('/users', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 401) {
            signOut();
          }
        });
    }
  }, [auth, setUser, signOut, user]);

  useEffect(() => {
    api
      .get('/classes', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        setUserClass(response.data);
      });
  }, [auth]);

  const handleSubmitUser = useCallback(
    async (data: UserData) => {
      try {
        setIsSaving(true);
        let schema;
        if (user.whatsapp || user.bio) {
          schema = getUpdateProffyValidation();
        } else {
          schema = getUpdateUserValidation();
        }

        if (data.whatsapp) {
          const whatsapp = data.whatsapp.replace(/\D/g, '');
          data.whatsapp = whatsapp;
        }
        await schema.validate(data, {
          abortEarly: false,
        });
        const response = await api.put('/users', data, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUser(response.data);
        addToast({
          type: 'success',
          title: 'Tudo certo',
          description: 'Seus dados foram atualizado com sucessor',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            addToast({
              type: 'info',
              title: 'Atenção',
              description: err.message,
            });
          });
        } else {
          const { data } = error.response;
          addToast({
            type: 'error',
            title: 'Aviso',
            description: data.detail,
          });
        }
      }
      setIsSaving(false);
    },
    [addToast, auth, setUser, user],
  );

  const handleSubmitClass = useCallback(
    async (data: ClassData) => {
      try {
        setIsSaving(true);
        data.id = userClass.id;
        data.del_schedules = delSchedules;
        const schema = getUpdateClassValidation();
        await schema.validate(data, {
          abortEarly: false,
        });
        const response = await api.put('/classes', data, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUserClass(response.data);
        addToast({
          type: 'success',
          title: 'Tudo certo',
          description: 'Sua aula foi atualizada com sucessor',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            addToast({
              type: 'info',
              title: 'Atenção',
              description: err.message,
            });
          });
        } else {
          const { data } = error.response;
          addToast({
            type: 'error',
            title: 'Aviso',
            description: data.detail,
          });
        }
      }
      setIsSaving(false);
    },
    [addToast, auth, delSchedules, userClass],
  );

  const handleSubmitPassword = useCallback(
    async (data: PasswordData) => {
      try {
        const schema = getPasswordValidation();
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.put('/users/password', data, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        addToast({
          type: 'success',
          title: 'Tudo certo',
          description: 'Sua senha foi alterada com sucesso',
        });
        formPasswordRef.current?.reset();
        setIsDisabled(true);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            addToast({
              type: 'info',
              title: 'Atenção',
              description: err.message,
            });
          });
        } else {
          const { data } = error.response;
          addToast({
            type: 'error',
            title: 'Aviso',
            description: data.detail,
          });
        }
      }
    },
    [addToast, auth],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const fileData = new FormData();
        fileData.append('avatar', e.target.files[0]);

        setShowAvatar(false);
        api
          .put('/users', fileData, {
            headers: { Authorization: `Bearer ${auth.token}` },
          })
          .then((response) => {
            setUser(response.data);
            addToast({
              type: 'success',
              title: 'Tudo certo!',
              description: 'O seu avatar foi atualizado com sucesso.',
            });
            setShowAvatar(true);
          })
          .catch((error) => {
            addToast({
              type: 'error',
              title: 'Aviso',
              description:
                'Não foi possível altera seu avatar tente novamente.',
            });
            setShowAvatar(true);
          });
      }
    },
    [addToast, auth, setUser],
  );

  const addNewScheduleItem = useCallback(() => {
    if (userClass.schedules.length < 10) {
      if (formClassRef.current?.getData()) {
        const data = formClassRef.current.getData() as ClassData;
        const newSchedule = { week_day: 0, froM: '', to: '' };
        const tempSchedule = data.schedules;
        tempSchedule.unshift(newSchedule);
        setUserClass({
          ...userClass,
          schedules: tempSchedule,
        });
      }
    } else {
      addToast({
        type: 'info',
        title: 'Ateção',
        description: 'Você atingiu o máximo de horários possível',
      });
    }
  }, [addToast, userClass]);

  const removeScheduleItem = useCallback(
    (id: string | undefined, scheduleIndex: number) => {
      if (id) {
        setDelSchedules([...delSchedules, id]);
      }
      if (formClassRef.current?.getData()) {
        const data = formClassRef.current.getData() as ClassData;
        const removedSchedule = data.schedules.filter(
          (_, index) => scheduleIndex !== index,
        );
        setUserClass({
          ...userClass,
          schedules: removedSchedule,
        });
      }
    },
    [delSchedules, userClass],
  );

  const handleOnChange = useCallback(() => {
    const data = formPasswordRef.current?.getData() as PasswordData;
    const isEmpty = Object.values(data).some((value) => value === '');
    setIsDisabled(isEmpty);
  }, []);

  return (
    <Container>
      <Header title="Meu perfil" />
      <Content>
        <Background>
          {!user.id ? (
            <AvatarLoading>
              <SkeletonTheme color="#E5E5E5" highlightColor="#FFFFFF">
                <Skeleton
                  circle
                  height={180}
                  width={180}
                  style={{ margin: '30px 0' }}
                />
                <Skeleton style={{ width: 324, height: 67 }} />
              </SkeletonTheme>
            </AvatarLoading>
          ) : (
            <AvatarInput>
              <img
                src={
                  // eslint-disable-next-line no-nested-ternary
                  showAvatar ? user.avatar : loadingImg
                }
                alt="avatar"
              />
              {showAvatar && (
                <label htmlFor="avatar" title="Altera avatar">
                  <FiCamera />
                  <input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
              <div className="user-name">
                <h1>
                  {user.name} {user.last_name}{' '}
                </h1>
                {userClass && <p>{userClass.subject}</p>}
              </div>
            </AvatarInput>
          )}
        </Background>
        <FormSections>
          {!user.id ? (
            <FormLoading>
              <SkeletonTheme color="#E5E5E5" highlightColor="#FFFFFF">
                <Skeleton style={{ width: 736, height: 400 }} />
              </SkeletonTheme>
            </FormLoading>
          ) : (
            [
              <Section>
                <Form
                  id="form-user"
                  onSubmit={handleSubmitUser}
                  ref={formUserRef}
                  initialData={user}
                >
                  <fieldset>
                    <legend>Seus dados</legend>
                    <Input
                      name="name"
                      type="text"
                      label="Nome"
                      style={{ width: '270px' }}
                    />
                    <Input
                      name="last_name"
                      type="text"
                      label="Sobrenome"
                      style={{ width: '270px' }}
                    />
                    <Input
                      name="email"
                      type="text"
                      label="E-mail"
                      style={{ width: '324px' }}
                    />
                    <TextMask
                      name="whatsapp"
                      type="text"
                      label="Whatsapp"
                      guide={false}
                      mask={getPhoneMask()}
                      tabIndex={-1}
                      readOnly={!user.whatsapp}
                    />
                    <TextArea name="bio" readOnly={!user.whatsapp} />
                  </fieldset>
                  <footer>
                    <img src={warningIcon} alt="Warning" />
                    {!user.whatsapp || !user.bio ? (
                      <p>
                        <span>Aviso!</span> <br />
                        Registre uma aula para colocar sua biografia e whatsapp.
                      </p>
                    ) : (
                      <p>
                        <span>Aviso!</span> <br />
                        Preencha todos os dados corretamente.
                      </p>
                    )}

                    <Button form="form-user" type="submit" disabled={isSaving}>
                      Salvar
                    </Button>
                  </footer>
                </Form>
              </Section>,
              userClass.id && (
                <Section>
                  <Form
                    id="form-class"
                    onSubmit={handleSubmitClass}
                    ref={formClassRef}
                  >
                    <fieldset>
                      <legend>Sobre a aula</legend>
                      <SelectArea
                        name="subject"
                        label="Matérias"
                        placeholder="Selecione qual você quer ensinar"
                        options={subjectOptions}
                        defaultValue={subjectOptions.find(
                          (option) => option.value === userClass.subject,
                        )}
                      />
                      <TextMask
                        name="cost"
                        type="text"
                        label="Custo da sua hora por aula"
                        defaultValue={userClass.cost}
                        labelSize="13.7px"
                        guide={false}
                        style={{ width: '192px' }}
                        placeholder="R$"
                        mask={getCurrencyMask()}
                      />
                    </fieldset>
                    <fieldset>
                      <legend>
                        Horários disponíveis
                        <i
                          className="add-schedule"
                          onClick={addNewScheduleItem}
                          style={{ fontStyle: 'normal' }}
                        >
                          + Novo horário
                        </i>
                      </legend>
                      {userClass.schedules &&
                        userClass.schedules.map((schedule, index) => {
                          return (
                            <div
                              key={schedule.id ? schedule.id : uuidv4()}
                              className="schedule-items"
                            >
                              {schedule.id && (
                                <Input
                                  type="text"
                                  display="none"
                                  name={`schedules[${index}].id`}
                                  defaultValue={schedule.id}
                                />
                              )}

                              <SelectArea
                                name={`schedules[${index}].week_day`}
                                label="Dia da semana"
                                placeholder="Selecione o dia"
                                options={weekDayOptions}
                                defaultValue={weekDayOptions.find(
                                  (option) =>
                                    option.value === schedule.week_day,
                                )}
                                isOptionDisabled={(weekDayOptions) =>
                                  weekDayOptions.value === 0
                                }
                                style={{ width: '320px' }}
                              />
                              <TextMask
                                name={`schedules[${index}].froM`}
                                type="text"
                                label="De"
                                defaultValue={schedule.froM}
                                style={{ width: '128px' }}
                                placeholder="00:00"
                                guide={false}
                                mask={getTimeMask()}
                              />
                              <TextMask
                                name={`schedules[${index}].to`}
                                type="text"
                                label="Até"
                                defaultValue={schedule.to}
                                placeholder="00:00"
                                style={{ width: '128px' }}
                                guide={false}
                                mask={getTimeMask()}
                              />
                              {userClass.schedules.length !== 1 && (
                                <i
                                  style={{ fontStyle: 'normal' }}
                                  className="schedule-dele"
                                  onClick={() =>
                                    removeScheduleItem(schedule.id, index)
                                  }
                                >
                                  <span>Excluir horário</span>
                                </i>
                              )}
                            </div>
                          );
                        })}
                    </fieldset>
                    <footer>
                      <img src={warningIcon} alt="Warning" />
                      <p>
                        <span>Importante!</span> <br />
                        Preencha todos os dados corretamente.
                      </p>
                      <Button
                        form="form-class"
                        type="submit"
                        disabled={isSaving}
                      >
                        Salvar
                      </Button>
                    </footer>
                  </Form>
                </Section>
              ),
              <Section>
                <Form
                  id="form-password"
                  onSubmit={handleSubmitPassword}
                  ref={formPasswordRef}
                  initialData={user}
                >
                  <fieldset>
                    <legend>Senha</legend>
                    <Input
                      name="old_password"
                      type="password"
                      label="Senha atual"
                      style={{ width: '140px', marginRight: '10px' }}
                      onChange={handleOnChange}
                    />
                    <Input
                      name="new_password"
                      type="password"
                      label="Nova senha"
                      style={{ width: '140px', marginRight: '10px' }}
                      onChange={handleOnChange}
                    />
                    <Input
                      name="confirm_password"
                      type="password"
                      label="Confirma senha"
                      style={{ width: '140px', marginRight: '10px' }}
                      onChange={handleOnChange}
                    />
                  </fieldset>
                  <footer>
                    <img src={warningIcon} alt="Warning" />
                    <p>
                      <span>Opcional!</span> <br />
                      Para altera senha preencha todos os campos corretamente
                    </p>
                    <Button
                      disabled={isDisabled}
                      form="form-password"
                      type="submit"
                    >
                      Altera
                    </Button>
                  </footer>
                </Form>
              </Section>,
            ]
          )}
        </FormSections>
      </Content>
    </Container>
  );
};

export default RegisterClass;
