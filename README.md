<h1 align="center">
    <img alt="Proffy" src="https://user-images.githubusercontent.com/32133062/113159394-f4428980-9212-11eb-981f-93bb0fd8e1a9.png" height="100px" />
    <br>Next Level Week #2<br/>
</h1>

<p align="center">
<a href="https://rocketseat.com.br">
  <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%237519C1">
</a>
 <a>
<img alt="License" src="https://img.shields.io/github/license/vitorserrano/ecoleta?color=%237519C1">
<br><br>
</p>
<p align="center">
  <a href="#bookmark-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-deploy-da-aplicação">Deploy da Aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#boom-como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <img alt="design do projeto" width="650px" src="https://user-images.githubusercontent.com/32133062/113159747-3cfa4280-9213-11eb-9d4a-f698917703b5.png" align="center" />
<p>

## :bookmark: Sobre

O **Proffy** é uma aplicação Web e Mobile feita para auxiliar na conexão entre os alunos e os professores. Logo, esta aplicação oferece aos professores a possibilidade de registrar aulas, podendo adicionar informações como a disciplina, o custo e horário e aos alunos a possibilidade de buscar pelas aulas cadastradas.
  
Este projeto foi idealizado pensando no **6 de agosto**, onde se comemora o **Dia Nacional dos Profissionais da Educação**.
  
Essa aplicação foi realizada durante a Next **Level Week #2**, projeto da [Rocketseat](https://rocketseat.com.br/).

Esta e a versão 2.0 deixado com desafio no final do evento, [Proffy 2.0](https://www.notion.so/Vers-o-2-0-Proffy-eefca1b981694cd0a895613bc6235970) 

## :rocket: Tecnologias

-  [Python](https://www.python.org/)
-  [Django REST](https://www.django-rest-framework.org/)
-  [ReactJS](https://reactjs.org/)
-  [React Native](http://facebook.github.io/react-native/)
-  [Expo](https://expo.io/)
-  [Docker](https://www.docker.com/)
{...}

## :hammer: Deploy da Aplicação
- [Web](https://lucas-proffy.vercel.app/)
- [Mobile](https://expo.io/@luccasph/projects/proffy)

## :boom: Como Executar

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador
  - Para o backend e frontend, é **necessário** possuir o **[Docker & Docker Compose](https://www.docker.com/)** instalado e configurado no computador
  - Para o mobile, é **essencial** ter o **[Expo](https://expo.io/)** instalado de forma global na máquina

- ### **Clonando o projeto**
  ```sh
  $ git clone https://github.com/luccasPh/proffy.git
  $ cd proffy
  ```
- ### **Iniciando o Backend e Frontend**
  ```sh
  # Criando a imagem Docker do banco de dados:
  # Dentro do projeto, já existe uma arquivo docker-compose.yml que possui o
  # PostgreSQL como banco de dados, basta ter o Docker instalado em sua máquina.
  $ docker-compose up -d # Iniciará em background e não irá bloquear o shell
  ```
  - [React app](http://localhost:3000)

- ### **Iniciando o Mobile(Android)**
  ```sh
  $ cd mobile
  $ yarn && yarn android && yarn start
  ```
