# AWS Final Project HAMA

아기 정보를 활용한 육아제품 추천 및 가계부 서비스 교육 프로젝트입니다.
AWS Cloud School 과정에서 MSA 구조, Kubernetes 배포, 컨테이너 이미지 운영, Cloud Migration 관점을 실습하기 위해 진행했습니다.

## 프로젝트 개요

- 기간: 2025.01.17 ~ 2025.03.25
- 역할: EKS 기반 인프라 구축, Architecture 설계, 팀장
- 주요 범위: 데이터 수집, 리뷰 요약, 서비스 프론트엔드, Review API, Kubernetes 배포 매니페스트

## 저장소 구조

```text
backend/
  review-service/   # NestJS 기반 Review API
frontend/           # Next.js 기반 서비스 화면
kustomize/          # Kubernetes 배포/서비스 매니페스트
```

## 담당 및 구현 내용

- Python 크롤링 데이터와 Kafka Topic을 연결하는 데이터 파이프라인 설계
- 리뷰 데이터 요약을 위한 AI API 연계 흐름 구성
- MongoDB 기반 원본 데이터 저장 및 서비스 API 연동
- On-premise Kubernetes 3-Tier 구조와 Cloud Migration 대상 AWS 아키텍처 설계
- Amazon EKS, VPC, IAM/IRSA, CloudFormation 기반 인프라 구성 실습
- Prometheus, Grafana, Loki, Tempo 계열 모니터링 환경 구축 실습

## 기술 스택

- Frontend: Next.js, React, Tailwind CSS
- Backend: NestJS, MongoDB, JWT
- Infra: Kubernetes, Kustomize, Docker, Harbor, AWS EKS, VPC, IAM, IRSA
- Data/AI: Kafka, Amazon Bedrock, OCR, MongoDB, DynamoDB
- Observability: Prometheus, Grafana, Loki, Tempo, OpenTelemetry

## 실행 방법

### Review API 실행

```bash
cd backend/review-service
npm install
npm run start:dev
```

### Frontend 실행

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Kubernetes 매니페스트 적용

```bash
kubectl apply -k kustomize
```

`kustomize`의 image registry, tag, namespace, resource 값은 실행 환경에 맞게 수정해서 사용합니다.

## 정리

이 저장소는 교육 프로젝트에서 구현한 서비스 코드와 Kubernetes 배포 흐름을 정리한 저장소입니다.
MSA 서비스 구성, 컨테이너 배포, Cloud Native 운영 흐름을 확인할 수 있도록 코드 중심으로 구성했습니다.
