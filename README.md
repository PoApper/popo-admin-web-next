# POPO Admin Web

<br />
<br />

<p align="center">
<img src="https://img.shields.io/badge/node-%3E%3D14.16-brightgreen">
<img src="https://img.shields.io/badge/npm-%3E%3D7.20-brightgreen">
</p>

<p align="center">
  <a href="http://popo.postech.ac.kr">
    <img src="https://raw.githubusercontent.com/PoApper/POPO-nest-api/master/assets/popo.svg" alt="Logo" height="150">
  </a>
  <p align="center">
    Public Web for POPO @ <a href="https://github.com/PoApper">PoApper</a>
    <br />
    POPO, POstechian's POrtal
    <br />
    👉 <a href="http://popo.postech.ac.kr">POPO</a>
  </p>
</p>

## About

POPO는 PoApper에서 개발하고, POSTECH 총학생회에서 운영하는 포털 사이트입니다. POPO를 통해 교내의 장소/장비를 예약하고, 자치단체 및 동아리 정보를 열람할 수 있습니다.


## Commands

```bash
$ npm install
// fill correct envrionments variables to .env file
$ npm run dev
```

### docker

#### On Your Local Computer

```bash
$ docker build . -t popo-admin-web
$ docker run -d -p 3001:3001 popo-admin-web
```

```bash
$ docker build . -t popo-admin-web
$ docker-compose up -d
```

#### With AWS ECR

On your local computer

```bash
# AWS ECR login
$ aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com
$ docker build . -t popo-admin-web
$ docker image tag popo-admin-web:latest 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com/popo-admin-web:latest
$ docker push 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com/popo-admin-web:latest
```

On AWS EC2 instance,

```bash
$ aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com  
$ docker pull 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com/popo-admin-web:latest
$ docker stop popo-admin-web
$ docker rm popo-admin-web
$ docker-compose -f ./docker-compose.prod.yaml up -d

# 옛날 이미지를 주기적으로 삭제해줘야 한다.
$ docker container prune # 중지된 모든 컨테이너 삭제
$ docker image prune # 사용하지 않는 이미지 삭제
```

## Specification

- ReactJS
- NextJS
- Semantic-ui-react
- styled-component
