# 🏥 메드트랜스퍼 (MedTransfer) - 환자 회송 연계 플랫폼 (MVP)

> **"전화 1통, 팩스 1장을 줄이는 클릭 한 번의 시작"**
> 기존 상급종합병원과 협력병원 간 구두(전화)와 서면(팩스, 엑셀)으로 이루어지던 파편화된 환자 회송 업무를 하나로 이어주는 SaaS 플랫폼입니다.

![MedTransfer MVP](https://placehold.co/800x200/efeff1/2563eb?text=MedTransfer+Patient+Transfer+Workflow)

## 📌 핵심 가치 (Core Value)
우리는 EMR이나 무거운 SI 시스템을 만들지 않습니다.
직관적인 **"환자 흐름 관리(Transfer Workflow)"**에만 집중하여 속도감 있는 업무 혁신을 제공합니다.
- 📞 **전화 → 클릭** (불필요한 확인 전화 감소)
- 📠 **팩스 → 링크** (기다림 없이 즉각적인 상태 연동)

---

## ✨ 주요 기능 (Key Features)

### 1. 🏥 상급병원 워크스페이스 (발신)
- **간편한 구조화 입력**: 환자를 특정할 수 있는 민간 의료 정보(주민번호 등)를 배제하고, 회송에 꼭 필요한 필수 필드(나이, 진단명, ADL, 산소여부, 감염여부)만 가볍게 입력합니다.
- **협력병원 실시간 상태 확인**: 회송 가능 여부와 잔여 병상 상태를 폼 제출 시점에 직관적으로 확인하고 선택할 수 있습니다.
- **상태 추적 리스트**: 보낸 환자 요청이 현재 대기 중인지, 확인했는지, 수용/거절되었는지 컬러 뱃지로 즉각 확인합니다.

### 2. 🤝 협력병원 워크스페이스 (수신)
- **실시간 요청 수신**: 상급병원에서 보낸 요청이 깔끔한 카드 형태로 즉시 수신함에 떨어집니다.
- **원클릭 확정 (One-Click Action)**: 들어온 요청의 진단명/감염 여부 등을 판단하고 `[수용]` 또는 `[거절]` 버튼을 클릭해 상급병원으로 즉각 알림을 보냅니다.

---

## 🛠 기술 스택 (Tech Stack)
안정적이고 빠른 B2B Web 서비스 구축을 위한 최신 모던 스택을 사용합니다.
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS (CSS Variables) 기반의 독자형 고품질 UI/UX 시스템 적용
- **Icons & UI Components**: Lucide React, React Hot Toast
- **Backend & Database (BaaS)**: Supabase (현재 MVP 버전은 별도의 DB 구성 없이 Mock Layer로 프론트엔드 단독 구동이 가능하도록 설계되어 있습니다.)

---

## 🚀 빠른 시작 (Getting Started)

MVP 구동을 위해 로컬 환경에 프로젝트를 띄우는 방법입니다.

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
명령어 실행 후 브라우저에서 `http://localhost:5173` 으로 접속하시면 실제 동작하는 MVP 디자인과 흐름을 체험해 보실 수 있습니다.

---

### 📝 Notice
*본 프로젝트는 PoC를 위한 MVP 구동 버전입니다. Supabase 연동 코드는 `src/lib/supabase.ts`에 구성되어 있으며, 실제 데이터베이스 연결 시 곧바로 실데이터 기반의 운영이 가능하도록 설계되어 있습니다.*

# 화면 캡쳐 
### 상급병원 워크스페이스
<img width="1215" height="940" alt="image" src="https://github.com/user-attachments/assets/9bf8e4bf-55a9-497a-9c9e-30f67cfe6bcf" />
### 환자 회송 요청
<img width="1226" height="888" alt="image" src="https://github.com/user-attachments/assets/267f63f6-1eca-442a-819f-93b6ca67a2f4" />
### 협력병원 워크스페이스
<img width="1217" height="593" alt="image" src="https://github.com/user-attachments/assets/d4323272-4f28-4fd6-872f-4cd0ac2e549d" />



