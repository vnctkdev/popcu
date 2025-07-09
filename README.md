# PopCu

트렌디한 팝업, 페스티벌, 콘서트 정보를 큐레이션하는 웹사이트

## 폴더 구조

- `client/` : 프론트엔드 (React + TypeScript + Vite)
- `server/` : 백엔드 (Node.js + Express + TypeScript)

## 로컬 실행법

### 1. 환경변수 설정
- `client/.env` 및 `server/.env` 파일을 `.env.example` 참고하여 생성

### 2. 의존성 설치
```bash
cd client && npm install
cd ../server && npm install
```

### 3. 개발 서버 실행
- 프론트엔드: `cd client && npm run dev`
- 백엔드: `cd server && npm run dev` (추후 스크립트 추가)

## 배포 가이드
- 프론트엔드: Vercel, Netlify 등 정적 호스팅 지원 플랫폼
- 백엔드: Render, Railway, Heroku 등
- DB: MongoDB Atlas

## 환경변수 예시
- 각 디렉토리의 `.env.example` 파일 참고

## 문의
- 깃허브 이슈 또는 PR로 문의 바랍니다. 