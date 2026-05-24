# Kubernetes Kustomize

HAMA MSA 서비스를 Kubernetes 환경에 배포하기 위한 Kustomize 매니페스트입니다.
서비스별 Deployment와 Service를 분리하고, 이미지 태그는 `kustomization.yaml`에서 관리하는 구조로 정리했습니다.

## 포함 서비스

- auth
- budget
- chat
- frontend
- image-thumbnail
- image-upload
- ocr
- product
- review
- shoppingcart

## 적용

```bash
kubectl apply -k .
```

## 이미지 태그 변경

```bash
kustomize edit set image registry.example.com/hama/hama-frontend=registry.example.com/hama/hama-frontend:287
```

## 운영 기준

- Registry 주소와 image tag는 배포 환경에 맞게 수정합니다.
- Namespace, resource request/limit, ingress, secret 값은 환경별 기준에 맞춰 별도 관리합니다.
