# mochestra_youtube

MOCHESTRA의 "영상" 탭. YouTube 검색·재생 플레이어 (React 19 + Vite 5, JavaScript).

## 실행 / 배포

- 개발 서버: `npm run dev` → http://localhost:5173/mochestra-youtube/ (`.claude/launch.json`의 `youtube` 설정)
- 빌드: `npm run build` → `dist/` (`dist`는 gitignore됨)
- 배포: `main`에 push하면 `.github/workflows/deploy.yml`이 GitHub Pages로 자동 배포. `vite.config.js`의 `base`가 `/mochestra-youtube/`이므로 경로를 바꾸면 같이 수정할 것.
- 이 폴더는 D 드라이브라 git이 "dubious ownership" 오류를 냄. `git config --global --add safe.directory D:/mochestra_youtube`를 한 번 실행하거나 `git -c safe.directory=D:/mochestra_youtube ...`로 실행.

## 구조

- `src/App.jsx` — 탭 상태, 선택 영상, API 키 관리
- `src/components/` — `Tabs`, `SearchPanel`, `FavoritesPanel`, `RecommendedPanel`, `ResultList`, `Player`, `KeyDialog`, `ThemeToggle`, `StarIcon`
- `src/hooks/useFavorites.js` — 즐겨찾기 (localStorage)
- `src/lib/youtube.js` — YouTube Data API 검색 + 캐시, 링크/ID 파싱
- `src/lib/storage.js` — localStorage 래퍼
- `src/styles/tokens.css` — MOCHESTRA 공통 컬러 토큰 (라이트/다크)
- `src/styles.css` — 앱 스타일 (토큰만 사용)
- `1.md` — React 전환 전의 단일 HTML 버전 (참고용)

## 규칙

- 색은 하드코딩하지 말고 `tokens.css`의 변수를 사용. 이 앱의 accent는 `--video` / `--video-strong`.
- 테마: `<html data-theme="light|dark">`, 저장 키 `mochestra-theme`. `index.html`의 인라인 스크립트가 첫 렌더 전에 적용함.
- `ThemeToggle`과 토큰은 `D:\mochestra_mpack`에서 가져온 공통 코드이므로, 수정 시 다른 MOCHESTRA 앱과 맞출 것.
- 커밋 메시지는 `style:`, `fix:`, `docs:` 같은 conventional 접두어 + 영어 한 줄.

## 진행 상황

작업을 마칠 때마다 이 섹션을 업데이트할 것.

### 완료
- 2026-09-24 단일 HTML → React + Vite 전환, GitHub Pages 배포, API 키 설정·검색 캐시
- 2026-09-25 반응형 프레임 레이아웃 수정
- 2026-09-26 즐겨찾기 별 모양 수정
- 2026-09-27 MOCHESTRA 공통 컬러 시스템 + 라이트/다크 테마 토글 적용

### 다음 할 일
- [x] 라이트/다크 테마를 실제 화면에서 확인 (탭, 검색 결과, 플레이어, 키 입력 창) — 2026-09-27 대비 검사 78개 통과
- [x] GitHub Pages 배포 결과 확인 — 2026-09-27 배포 성공, https://nicky0000-seoul.github.io/mochestra_youtube/
- [ ] 세로가 짧은 창(예: 800×600)에서 플레이어가 검색 결과 칸을 덮음. 레이아웃 수정 필요
- [ ] 검색 결과 목록 줄은 API 키가 있을 때만 보여서 대비 검사를 못 함. 키를 넣고 확인
- [ ] 추천 탭 데이터 소스 만들기 (`App.jsx`의 `recommended`가 빈 배열)
- [ ] YouTube API 키가 `src/lib/youtube.js`에 하드코딩되어 공개 저장소에 올라가 있음. Google Cloud 콘솔에서 HTTP referrer 제한이 걸려 있는지 확인
