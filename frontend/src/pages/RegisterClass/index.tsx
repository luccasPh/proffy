import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getPhoneMask, getCurrencyMask, getTimeMask } from '../../utils/masks';
import { getCreateClassValidation } from '../../utils/validation';
import { getSubjectOptions, getWeekDayOptions } from '../../utils/options';
import { useToast } from '../../hooks/toast';
import { useAuth, UserData } from '../../hooks/auth';
import TextMask from '../../components/TextMask';
import TextArea from '../../components/TextArea';
import SelectArea from '../../components/Select';
import Button from '../../components/Button';
import Header from '../../components/Header';
import api from '../../services/api';

import rocketIcon from '../../assets/images/icons/rocket.svg';
import warningIcon from '../../assets/images/icons/warning.svg';

import { Container, Content, Main, Titles, Avatar } from './styles';

interface FormData {
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
  schedules: {
    id: string;
    week_day: number;
    froM: string;
    to: string;
  }[];
}

interface ClassData {
  subject: string;
  cost: string;
  schedules: {
    id: string;
    week_day: number;
    froM: string;
    to: string;
  }[];
}

const weekDayOptions = getWeekDayOptions();
const subjectOptions = getSubjectOptions();

const RegisterClass: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();
  const { user, setUser, auth, updateUser, signOut } = useAuth();

  const [isDisabled, setIsDisabled] = useState(true);
  const [hideRemoveClick, setHideRemoveClick] = useState(true);
  const [scheduleItems, setScheduleItem] = useState([
    { id: uuidv4(), week_day: 0, froM: '', to: '' },
  ]);

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

  const registerClass = useCallback(
    async (classData) => {
      await api.post('/classes', classData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
    },
    [auth],
  );

  useEffect(() => {
    if (user.whatsapp || user.bio) {
      history.push('/profile');
    }
  }, [history, user]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsDisabled(true);
        const schema = getCreateClassValidation();
        const whatsapp = data.whatsapp.replace(/\D/g, '');
        const cost = data.cost.replace(/[R$\s]/g, '');
        data.whatsapp = whatsapp;
        data.cost = cost;
        await schema.validate(data, {
          abortEarly: false,
        });
        const userData: UserData = {
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          whatsapp: data.whatsapp,
          bio: data.bio,
        };
        const classData: ClassData = {
          subject: data.subject,
          cost: data.cost,
          schedules: data.schedules,
        };
        registerClass(classData);
        updateUser(userData);
        history.push({
          pathname: '/concluded',
          state: {
            title: 'Cadastro salvo!',
            description:
              'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.',
            to: '/',
            text: 'Voltar',
          },
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            addToast({
              type: 'info',
              title: 'Ateção',
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
      setIsDisabled(false);
    },
    [user, registerClass, updateUser, history, addToast],
  );

  const handleOnChange = useCallback(() => {
    const data = formRef.current?.getData() as FormData;
    const classIsEmpty = Object.values(data).some((x) => x === '');
    const scheduleIsEmpty = scheduleItems.some(
      (x) => x.froM === '' || x.to === '' || x.week_day === 0,
    );
    setIsDisabled(classIsEmpty || scheduleIsEmpty);
  }, [scheduleItems]);

  const addNewScheduleItem = useCallback(() => {
    if (scheduleItems.length < 10) {
      setScheduleItem([
        { id: uuidv4(), week_day: 0, froM: '', to: '' },
        ...scheduleItems,
      ]);
      setIsDisabled(true);
      setHideRemoveClick(false);
    } else {
      addToast({
        type: 'info',
        title: 'Ateção',
        description: 'Você atingiu o máximo de horários possível',
      });
    }
  }, [addToast, scheduleItems]);

  const removeScheduleItem = useCallback(
    (id: string) => {
      setScheduleItem(scheduleItems.filter((schedule) => schedule.id !== id));
      if (scheduleItems.length - 1 === 1) {
        setHideRemoveClick(true);
      }
    },
    [scheduleItems],
  );

  const setScheduleItemValue = useCallback(
    (id: string, field: string, event) => {
      const updateScheduleItems = scheduleItems.map((scheduleItem) => {
        if (scheduleItem.id === id) {
          return { ...scheduleItem, [field]: event.value };
        }
        return scheduleItem;
      });
      setScheduleItem(updateScheduleItems);
      handleOnChange();
    },
    [scheduleItems, handleOnChange],
  );

  useEffect(() => {
    handleOnChange();
  }, [scheduleItems, handleOnChange]);

  return (
    <Container>
      <Header title="Ensinar" />
      <Content>
        <Titles>
          <h1>Que incrível que você quer ensinar.</h1>
          <div>
            <h3>O primeiro passo, é preencher esse formulário de inscrição</h3>
            <img src={rocketIcon} alt="rocket" />
            <p>
              Prepare-se! <span>vai ser o máximo</span>
            </p>
          </div>
        </Titles>

        <Main>
          <Form id="form-class" onSubmit={handleSubmit} ref={formRef}>
            <fieldset>
              <legend>Seus dados</legend>
              {user.id ? (
                <Avatar>
                  <img src={user.avatar} alt="avatar" />
                  <p>
                    {user.name} {user.last_name}
                  </p>
                </Avatar>
              ) : (
                <SkeletonTheme color="#E5E5E5" highlightColor="#FFFFFF">
                  <Skeleton style={{ width: 284, height: 80 }} />
                </SkeletonTheme>
              )}

              <TextMask
                name="whatsapp"
                type="text"
                label="Whatsapp"
                guide={false}
                onChange={handleOnChange}
                mask={getPhoneMask()}
              />
              <TextArea name="bio" onChange={handleOnChange} />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>
              <SelectArea
                name="subject"
                label="Matérias"
                placeholder="Selecione qual você quer ensinar"
                onChange={handleOnChange}
                options={subjectOptions}
              />
              <TextMask
                name="cost"
                type="text"
                label="Custo da sua hora por aula"
                labelSize="13.7px"
                guide={false}
                style={{ width: '192px' }}
                placeholder="R$"
                onChange={handleOnChange}
                mask={getCurrencyMask()}
              />
            </fieldset>
            <fieldset>
              <legend>
                Horários disponíveis
                <i
                  className="add-schedule"
                  style={{ fontStyle: 'normal' }}
                  onClick={addNewScheduleItem}
                >
                  + Novo horário
                </i>
              </legend>
              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.id} className="schedule-items">
                    <SelectArea
                      name={`schedules[${index}].week_day`}
                      label="Dia da semana"
                      placeholder="Selecione o dia"
                      value={weekDayOptions.find(
                        (option) => option.value === scheduleItem.week_day,
                      )}
                      isOptionDisabled={(weekDayOptions) =>
                        weekDayOptions.value === 0
                      }
                      style={{ width: '320px' }}
                      onChange={(e) =>
                        setScheduleItemValue(scheduleItem.id, 'week_day', e)
                      }
                      options={weekDayOptions}
                    />
                    <TextMask
                      name={`schedules[${index}].froM`}
                      type="text"
                      label="De"
                      value={scheduleItem.froM}
                      style={{ width: '128px' }}
                      placeholder="00:00"
                      guide={false}
                      onChange={(e) =>
                        setScheduleItemValue(scheduleItem.id, 'froM', e.target)
                      }
                      mask={getTimeMask()}
                    />
                    <TextMask
                      name={`schedules[${index}].to`}
                      type="text"
                      label="Até"
                      value={scheduleItem.to}
                      placeholder="00:00"
                      style={{ width: '128px' }}
                      guide={false}
                      onChange={(e) =>
                        setScheduleItemValue(scheduleItem.id, 'to', e.target)
                      }
                      mask={getTimeMask()}
                      tabIndex={-1}
                    />
                    {!hideRemoveClick && (
                      <i
                        className="del-schedule"
                        onClick={() => removeScheduleItem(scheduleItem.id)}
                        style={{ fontStyle: 'normal' }}
                      >
                        <span>Excluir horário</span>
                      </i>
                    )}
                  </div>
                );
              })}
            </fieldset>
          </Form>
          <footer>
            <img src={warningIcon} alt="Aviso importante" />
            <p>
              <span>Importante!</span> <br />
              Preencha todos os dados corretamente.
            </p>
            <Button
              disabled={isDisabled}
              form="form-class"
              style={{ width: '229px' }}
              type="submit"
            >
              Salvar cadastro
            </Button>
          </footer>
        </Main>
      </Content>
    </Container>
  );
};

export default RegisterClass;
