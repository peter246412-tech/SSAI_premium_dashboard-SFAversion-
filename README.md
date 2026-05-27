# SSAI Dashboard

반도체 공급망 위험 신호를 시나리오별로 확인하는 SSAI 웹앱입니다.

## 실행

로컬 서버 실행:

```bash
python3 -m http.server 5173
```

브라우저 접속:

```text
http://localhost:5173
```

## 주요 기능

- 시나리오별 종합 Risk Score와 KPI 확인
- 도메인별 위험 점수, 30일 추세, 레이더 차트
- 주요 원인, 뉴스 피드, 공급사 노출도 테이블
- Daily Brief 복사 기능
