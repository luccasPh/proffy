import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { v4 as uuidv4 } from 'uuid';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { useToast } from '../../hooks/toast';
import SelectArea from '../../components/Select';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { UserData } from '../../hooks/auth';
import api from '../../services/api';
import {
  getSubjectOptions,
  getWeekDayOptions,
  getScheduleOptions,
} from '../../utils/options';

import smileIcon from '../../assets/images/icons/smile.svg';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import loadingImg from '../../assets/images/loading-2.svg';

import {
  Filters,
  Background,
  Card,
  MiniCard,
  Container,
  Loading,
} from './styles';

const weekDayOptions = getWeekDayOptions();
const subjectOptions = getSubjectOptions();
const scheduleOptions = getScheduleOptions();

interface SearchClassProps {
  subject: string;
  week_day: string;
  schedule: string;
}

interface ClassListData {
  id: string;
  subject: string;
  cost: string;
  user: UserData;
  schedules: {
    id: string;
    week_day: number;
    froM: string;
    to: string;
  }[];
}

const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

const SearchClass: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [classList, setClassList] = useState<ClassListData[]>([]);
  const [totalTeachers, setTotalTeachers] = useState(-1);
  const [welcome, setWelcome] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/classes/proffys').then((response) => {
      setTotalTeachers(response.data.total);
    });
  }, []);

  const handleSubmit = useCallback(
    async (formData: SearchClassProps) => {
      try {
        setLoading(true);
        const response = await api.get('/classes/list', {
          params: {
            subject: formData.subject,
            week_day: formData.week_day,
            schedule: formData.schedule,
          },
        });

        setClassList(response.data);
        setWelcome(false);
      } catch (error) {
        const { data } = error.response;
        addToast({
          type: 'error',
          title: 'Aviso',
          description: data.detail,
        });
      }
      setLoading(false);
    },
    [addToast],
  );

  const handleOnChange = useCallback(() => {
    const data = formRef.current?.getData() as SearchClassProps;
    const classIsEmpty = Object.values(data).some((x) => x === '');
    if (!classIsEmpty) formRef.current?.submitForm();
  }, []);

  const handleButton = useCallback(
    async (id: string | undefined, whatsapp: string | undefined) => {
      await api.post('/classes/connection', {
        user_id: id,
      });

      window.open(`https://wa.me/+55${whatsapp}`, '_blank');
    },
    [],
  );

  return (
    <Container>
      <Header title="Estudar" />
      <Background>
        <div className="content">
          <h1>
            Estes são os <br /> proffys disponíveis.
          </h1>
          {totalTeachers !== -1 ? (
            totalTeachers > 0 && (
              <div>
                <img src={smileIcon} alt="rocket" />
                <p>Nós temos {totalTeachers} professores.</p>
              </div>
            )
          ) : (
            <SkeletonTheme color="#E5E5E5" highlightColor="#FFFFFF">
              <Skeleton style={{ width: 129, height: 40 }} />
            </SkeletonTheme>
          )}
        </div>
      </Background>

      <Filters>
        <Form id="form-class" onSubmit={handleSubmit} ref={formRef}>
          <SelectArea
            name="subject"
            label="Matérias"
            placeholder="Selecione"
            onBlur={handleOnChange}
            tabIndex="-1"
            options={subjectOptions}
            style={{ width: '231px', marginRight: '20px' }}
          />
          <SelectArea
            name="week_day"
            label="Dia da semana"
            placeholder="Selecione"
            onBlur={handleOnChange}
            tabIndex="-1"
            options={weekDayOptions}
            isOptionDisabled={(weekDayOptions) => weekDayOptions.value === 0}
            style={{ width: '231px', marginRight: '20px' }}
          />
          <SelectArea
            name="schedule"
            label="Horário"
            placeholder="Selecione"
            onBlur={handleOnChange}
            tabIndex="-1"
            options={scheduleOptions}
            style={{ width: '231px' }}
          />
        </Form>
      </Filters>

      <div className="card-container">
        {loading ? (
          <Loading>
            <img src={loadingImg} alt="loading" />
          </Loading>
        ) : (
          [
            classList &&
              classList.map((classItem) => {
                return (
                  <Card key={classItem.id}>
                    <div className="card-header">
                      <img src={classItem.user.avatar} alt="avatar" />
                      <h3>
                        {classItem.user.name} {classItem.user.last_name}
                        <span>{classItem.subject}</span>
                      </h3>
                    </div>
                    <div className="card-body">
                      <textarea value={classItem.user.bio} readOnly />
                      <div className="minicard-container">
                        {classItem.schedules.map((schedule) => {
                          if (schedule.id) {
                            return (
                              <MiniCard key={schedule.id}>
                                <p>Dia</p>
                                <h3 className="day">
                                  {days[schedule.week_day - 1]}
                                </h3>
                                <p>Horário</p>
                                <h3 style={{ fontSize: '14.5px' }}>
                                  {schedule.froM}h - {schedule.to}h
                                </h3>
                              </MiniCard>
                            );
                          }
                          return (
                            <MiniCard style={{ opacity: '0.4' }} key={uuidv4()}>
                              <p>Dia</p>
                              <h3 className="day">
                                {days[schedule.week_day - 1]}
                              </h3>
                              <p>Horário</p>
                              <h3> - </h3>
                            </MiniCard>
                          );
                        })}
                      </div>
                    </div>
                    <div className="card-footer">
                      <p>Preço/hora</p>
                      <h3>R$ {classItem.cost}</h3>
                      <Button
                        onClick={() =>
                          handleButton(
                            classItem.user.id,
                            classItem.user.whatsapp,
                          )
                        }
                        style={{ width: '256px', height: '56px' }}
                      >
                        <img src={whatsappIcon} alt="whatsapp" />
                        Entra em contato
                      </Button>
                    </div>
                  </Card>
                );
              }),

            welcome ? (
              <p className="end-text" style={{ marginTop: '120px' }}>
                Depois de seleciona todos os campos a cima clique em qualquer
                lugar da pagina
              </p>
            ) : (
              [
                classList.length > 0 ? (
                  <p key={uuidv4()} className="end-text">
                    Estes são todos os resultados
                  </p>
                ) : (
                  <p className="end-text" style={{ marginTop: '120px' }}>
                    Nenhum professor encontrado com sua pesquisa.
                  </p>
                ),
              ]
            ),
          ]
        )}
      </div>
    </Container>
  );
};

export default SearchClass;
