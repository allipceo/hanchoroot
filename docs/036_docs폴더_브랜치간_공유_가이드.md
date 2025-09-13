# docs 폴더 브랜치간 공유 가이드

**작성일**: 2025년 1월 17일  
**작성자**: 서대리  
**목적**: docs 폴더를 모든 브랜치에서 공유하여 맥락 유지  
**문서번호**: 036

---

## 🎯 **공유 목적**

### **맥락 유지**
- **브랜치 전환 시** 모든 문서 접근 가능
- **개발 연속성** 보장
- **이전 작업 내용** 손실 방지

### **협업 효율성**
- **공통 문서** 접근으로 일관성 유지
- **참고 자료** 즉시 활용 가능
- **문서 버전 관리** 통합

---

## 🔧 **공유 설정 방법**

### **방법 1: Git Sparse Checkout (권장)**

#### **1단계: Sparse Checkout 활성화**
```bash
# 현재 브랜치에서 실행
git config core.sparseCheckout true
```

#### **2단계: 공유할 폴더 지정**
```bash
# .git/info/sparse-checkout 파일 생성/수정
echo "docs/*" >> .git/info/sparse-checkout
echo "data/converted_complete_data.json" >> .git/info/sparse-checkout
echo "data/notion_data_complete.json" >> .git/info/sparse-checkout
```

#### **3단계: 설정 적용**
```bash
git read-tree -m -u HEAD
```

### **방법 2: 심볼릭 링크 (대안)**

#### **Windows 환경**
```cmd
# docs 폴더를 심볼릭 링크로 생성
mklink /D docs "..\main\docs"
```

#### **Linux/Mac 환경**
```bash
# docs 폴더를 심볼릭 링크로 생성
ln -s ../main/docs docs
```

### **방법 3: 수동 복사 (간단한 방법)**

#### **새 브랜치 생성 시**
```bash
# 새 브랜치 생성 후
cp -r ../main/docs ./
cp ../main/data/converted_complete_data.json ./data/
cp ../main/data/notion_data_complete.json ./data/
```

---

## 📁 **공유할 핵심 파일들**

### **docs 폴더 (전체)**
```
docs/
├── 017_한양조씨 족보앱 사용자 시나리오 최종 확정본_V3.0.md
├── 018_한양조씨 족보앱 UI 설계 최종 확정본_V3.0.md
├── 019_한양조씨 족보앱 데이터 스키마 최종 확정본_V3.0.md
├── 029_노션-JSON_동기화_프로세스_가이드.md (V2.0)
├── 033_노션_데이터베이스_접근_문제_해결보고서.md
├── 034_4단계_패밀리별보기_세부개발계획서_V2.0.md
├── 035_4단계_개발_인수인계서.md
└── 036_docs폴더_브랜치간_공유_가이드.md
```

### **data 폴더 (핵심 파일만)**
```
data/
├── converted_complete_data.json      # 152명 완전한 JSON 데이터
├── notion_data_complete.json         # 152명 완전한 노션 원본 데이터
├── complete_notion_fetch.js          # 완전한 노션 데이터 추출 스크립트
├── complete_verification.js          # 완전한 검증 스크립트
└── sync_notion_to_json_v2.js         # 자동 동기화 스크립트
```

---

## 🚀 **새 브랜치에서 설정 방법**

### **브랜치 생성 및 전환**
```bash
# 새 브랜치 생성
git checkout -b GIA-FEATURE-4STAGE-FAMILY-VIEW

# docs 폴더 공유 설정
git config core.sparseCheckout true
echo "docs/*" >> .git/info/sparse-checkout
echo "data/converted_complete_data.json" >> .git/info/sparse-checkout
echo "data/notion_data_complete.json" >> .git/info/sparse-checkout
git read-tree -m -u HEAD
```

### **인수인계서 확인**
```bash
# 인수인계서 확인
cat docs/035_4단계_개발_인수인계서.md

# 세부계획서 확인
cat docs/034_4단계_패밀리별보기_세부개발계획서_V2.0.md
```

### **데이터 확인**
```bash
# 152명 데이터 확인
node -e "const data = JSON.parse(require('fs').readFileSync('data/converted_complete_data.json', 'utf8')); console.log('총 인물 수:', data.persons.length);"
```

---

## ⚠️ **주의사항**

### **파일 수정 시**
- **docs 폴더 파일 수정** 시 모든 브랜치에 영향
- **공유 데이터 파일 수정** 시 주의 필요
- **브랜치별 고유 파일**과 구분하여 관리

### **충돌 방지**
- **브랜치별 작업 파일**은 별도 폴더에 저장
- **공유 파일 수정** 전 다른 브랜치와 협의
- **버전 관리** 철저히 수행

### **백업 관리**
- **중요한 수정** 전 백업 생성
- **브랜치별 백업** 별도 관리
- **복구 계획** 수립

---

## 🔍 **검증 방법**

### **공유 설정 확인**
```bash
# sparse checkout 설정 확인
git config core.sparseCheckout

# 공유 파일 목록 확인
cat .git/info/sparse-checkout
```

### **파일 접근 확인**
```bash
# docs 폴더 접근 확인
ls -la docs/

# 핵심 데이터 파일 접근 확인
ls -la data/converted_complete_data.json
ls -la data/notion_data_complete.json
```

### **인수인계서 접근 확인**
```bash
# 인수인계서 내용 확인
head -20 docs/035_4단계_개발_인수인계서.md
```

---

## 📝 **체크리스트**

### **새 브랜치 생성 시**
- [ ] 브랜치 생성 완료
- [ ] docs 폴더 공유 설정 완료
- [ ] 핵심 데이터 파일 공유 설정 완료
- [ ] 인수인계서 접근 확인 완료
- [ ] 세부계획서 접근 확인 완료
- [ ] 152명 데이터 접근 확인 완료

### **개발 시작 전**
- [ ] 모든 참고 문서 접근 가능 확인
- [ ] 이전 작업 내용 파악 완료
- [ ] 개발 계획 숙지 완료
- [ ] 데이터 구조 이해 완료

---

## 🎯 **성공 기준**

### **공유 성공**
- ✅ 모든 브랜치에서 docs 폴더 접근 가능
- ✅ 핵심 데이터 파일 접근 가능
- ✅ 인수인계서 접근 가능
- ✅ 맥락 유지 완료

### **개발 연속성 성공**
- ✅ 이전 작업 내용 손실 없음
- ✅ 개발 계획 연속성 유지
- ✅ 데이터 무결성 보장
- ✅ 협업 효율성 향상

---

**문서 작성 완료일**: 2025년 1월 17일  
**적용 예정일**: 2025년 1월 17일 (새 브랜치 생성 시)
