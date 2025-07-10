# PopCu - Vite + React + TypeScript

## ✨ Vercel 원클릭 배포법

1. **GitHub에 최신 커밋이 반영되어 있는지 확인**
2. [Vercel](https://vercel.com) 회원가입 및 로그인 (GitHub 연동)
3. Vercel 대시보드에서 'New Project' 클릭 → popcu 저장소 선택
4. **Root Directory(루트 디렉토리): `client`** 로 지정
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. (필요시) 환경변수 설정
8. Deploy 클릭 → 배포 완료 후 URL로 접속하면 바로 예쁜 UI 확인!

> ⚠️ 404 에러가 뜬다면 `client/vercel.json` 파일이 반드시 포함되어 있는지, 위 설정이 정확한지 확인하세요.

---

## 🖥️ 로컬 실행 방법

```bash
cd client
npm install
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

---

## 기타 안내
- 본 프로젝트는 Vite + React + TypeScript 기반입니다.
- SPA 라우팅 지원을 위해 `client/vercel.json`이 포함되어 있습니다.
- 백엔드(Express/MongoDB)는 별도 서버에서 운영해야 합니다.

---
