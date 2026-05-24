# Review Service

육아제품 리뷰 데이터를 조회하고 서비스 화면에 제공하기 위한 NestJS 기반 API입니다.
MSA 구조에서 Review 도메인을 분리해 컨테이너로 배포하는 흐름을 실습했습니다.

## 주요 기능

- 리뷰 데이터 조회 API
- MongoDB 기반 리뷰 스키마 구성
- JWT Guard 기반 인증 요청 처리
- Swagger/NestJS 구조를 활용한 API 모듈화
- Docker 기반 컨테이너 빌드

## 구조

```text
src/
  auth/       # JWT strategy/module
  guards/     # JWT auth guard
  review/     # review controller, service, schema, dto
  app.module.ts
  main.ts
```

## 실행

```bash
npm install
npm run start:dev
```

## 환경 변수

```bash
MONGODB_URI=mongodb://localhost:27017/hama-review
PORT=3004
```

## 빌드

```bash
npm run build
npm run start:prod
```
