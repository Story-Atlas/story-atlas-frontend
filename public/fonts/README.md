# 폰트 파일 다운로드 안내

이 디렉토리에 다음 폰트 파일들을 다운로드해주세요:

## 1. 모던 고딕 - Pretendard
- 파일: `PretendardVariable.woff2` (이미 있음)
- 다운로드: https://github.com/orioncactus/pretendard/releases

## 2. 클래식 명조 - KoPub 바탕체
- 디렉토리: `kopub-batang/`
- 파일 형식: **TTF 또는 OTF** (둘 다 가능)
- 파일명 예시:
  - `KoPubBatang-Medium.ttf` 또는 `KoPubBatang-Medium.otf`
  - `KoPubBatang-Regular.ttf` 또는 `KoPubBatang-Regular.otf`
- 다운로드: https://www.kopus.org/biz-electronic-font2/
- **참고**: TTF와 OTF 중 어떤 것을 받아도 됩니다. 둘 다 지원합니다.

## 3. 감성 손글씨 - 미생체
- 디렉토리: `misengchae/`
- 파일 형식: **TTF 또는 OTF** (둘 다 가능)
- 파일명 예시:
  - `Misengchae-Regular.ttf` 또는 `Misengchae-Regular.otf`
- 다운로드: 네이버 폰트 또는 제작자 배포 페이지
- **참고**: TTF와 OTF 중 어떤 것을 받아도 됩니다.

## 4. 레트로 빈티지 - BM 을지로체
- 디렉토리: `bm-euljiro/`
- 파일 형식: **TTF 또는 OTF** (둘 다 가능)
- 파일명 예시:
  - `BMEuljiro10years.ttf` 또는 `BMEuljiro10years.otf`
- 다운로드: https://www.woowahan.com/#/fonts
- **참고**: TTF와 OTF 중 어떤 것을 받아도 됩니다.

## 📌 중요: 파일 형식 선택 가이드

**TTF와 OTF 둘 다 사용 가능합니다!**

- **TTF (TrueType Font)**: 가장 일반적인 형식, 대부분의 폰트가 제공
- **OTF (OpenType Font)**: TTF의 확장 형식, 더 많은 기능 지원
- **우선순위**: 코드에서 WOFF2 > WOFF > TTF > OTF 순서로 자동 선택됩니다
- **권장**: 다운로드 가능한 형식 중 아무거나 받으셔도 됩니다 (TTF 또는 OTF)

## 폰트 파일 변환 (선택사항)
TTF/OTF 파일을 WOFF2로 변환하면 파일 크기가 작아져 로딩이 더 빠릅니다:
```bash
# woff2 도구 설치 후
woff2_compress font.ttf
```
**하지만 변환 없이 TTF/OTF 그대로 사용해도 완전히 작동합니다!**

