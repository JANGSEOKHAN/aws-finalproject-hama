# Frontend

아기 정보 기반 육아제품 추천, 장바구니, 가계부, 영수증 OCR 지출 등록, 리뷰/검색 화면을 제공하는 Next.js 프론트엔드입니다.
MSA API Gateway 역할의 Next.js API Route를 두고 각 Backend Service와 연동하는 구조로 구성했습니다.

## 주요 기능

- 육아제품 추천 및 상품 검색 화면
- 장바구니 기반 추천 흐름
- 가계부 지출 등록과 소비 통계 화면
- 영수증 OCR 결과를 지출 내역으로 연결하는 화면
- 리뷰, 커뮤니티, 마이페이지 화면
- 서비스별 Backend URL을 환경 변수로 분리

## 구조

```text
app/
  api/          # Backend service proxy route
  components/   # UI components
  budget/       # budget/account book page
  product/      # product detail/search page
  statistics/   # statistics dashboard
public/
utils/
```

## 실행

```bash
npm install
cp .env.example .env
npm run dev
```

## 환경 변수

`.env.example` 파일을 기준으로 각 서비스 URL을 실행 환경에 맞게 수정합니다.

```bash
NEXT_PUBLIC_BACKEND_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_BACKEND_UPLOAD_URL=http://localhost:3002
NEXT_PUBLIC_BACKEND_REVIEW_URL=http://localhost:3004
NEXT_PUBLIC_BACKEND_BUDGET_URL=http://localhost:3005
NEXT_PUBLIC_BACKEND_SEARCH_URL=http://localhost:3007
NEXT_PUBLIC_BACKEND_CART_URL=http://localhost:3008
```
