# 공통 프로젝트

## ❓ 아이디어 구상

### 김성재
- 주제: 느린 영상 우체통
- 서비스 구상
  - 현재를 인식하는 순간, 과거가 되어버린다.
  - 한 달 후, 혹은 일 년 후의 나에게 영상편지를 전송하여 흘러가버린 과거를 되짚어보자
  - 그 시절의 나와 지금의 나는 어떻게 달라져있을까?

### 조연주

- 주제: 편지로 소통하는 숲 컨셉의 온라인 커뮤니티 사이트
- 서비스 구상
  - 숲: 배경, 관심사가 같은 사람들과 같은 그룹에 소속된다.
  - 우체통: 다른 사람들과 편지를 주고 받을 수 있다.
  - 나의 동물: 출석 체크, 데일리 미션, 편지 쓰기 활동 등을 통해 키울 수 있다.

### 윤정인
- 주제: 모두의 우체통
- 서비스 구상
  - 편지를 쓰고, 남이 쓴 편지도 읽어볼 수 있는 서비스
  - 가벼운 사연을 받아 게시판에 게시한 후, 24시간 후 펑한다
  - 성향이 비슷한 사람(키워드가 비슷한 사람들끼리) 실시간 채팅방에서 열어 얘기할 수 있다

### 안성재
- 주제: 모두의 우체통
- 서비스 구상
    - 내가 편지를 쓰면, 나도 편지 한장을 받는다 - 1:1
        - 내가 쓰는 편지에도 나를 나타낼 수 있는 키워드 동봉
        - 편지 여러장 중 관심사를 보고 편지 선택
    - 출석 체크를 통해 하루의 한개 우표를 받을 수 있음
    - 답장을 보내거나 받을 때는 심리적 거리에 따라 편지 송수신시 시간에 차별화를 줌

### 이서윤
- 주제: 관심사나 취미, 취향이 비슷한 익명의 누군가와 편지를 주고받는 플랫폼
- 서비스 구상
    - 인스턴트 메세지의 시대 속에 지친 사람들을 위한 느리지만, 의미있는 의사소통 
    - 편지 작성 후 나를 나타내는 키워드 표시
    - 처음엔 1:N의 형식으로 뿌리고 마음에 들면 1:1로 편지 교환
    - 우편을 받은 유저는 키워드만을 보고 우편을 볼 지 안 볼 지 결정
        - 안보기로 결정=토스기능
    - 편지 주고 받을 때 처음엔 느리게 하다가 친밀도 높아지면 주고 받는 속도 빨라지게
        - 친밀도를 1:1 사이에서도 높일 수 있지만 광고를 본다던가 편지를 더 쓴다던가 하는 외부의 행위로 높일 수도 있게
        - 처음에는 글로만 주고받다가 친밀도 높아지면 사진 공유까지 가능해지게
        - 친밀도 다다르면 음성통화, 영상통화도 가능하게
    - 골라둔 키워드랑 비슷하게 선택한 유저 몇 명의 우체통에 편지가 배송되는 형식(약간 해리포터 부엉이처럼)
    - 편지를 주고 받는 사람이 나에 대한 키워드를 정의해주면 기존 키워드에 추가하는 방식도 고려..→ LIKE랑 유사
    - 친밀도를 알이나 성장형으로 시각화할 수 있는 아이콘(or 게이지)으로 나타내도 좋을듯

### 유호정
- 주제: 익명의 편지를 주고 받으며 관심사가 비슷한 사람과 대화할 수 있는 플랫폼
- 서비스 구상
    - 자신을 드러내지 않고도 관심사가 비슷한 사람이면 의견을 나누며 편지를 주고 받을 수 있다
    - 자신의 관심사와 비슷한 내용을 담은 편지를 랜덤으로 뽑거나 받아볼 수 있다.
    - 편지지를 꾸며서 익명으로 편지를 보낼 수 있다
    - 우정레벨이 높아지면 더욱 빠른 속도로 편지를 주고받을 수 있다
    - 우정레벨이 높아질수록 채팅, 전화, 영상통화 기능을 사용할 수 있다
    - 미래의 나에게 편지를 보낼 수 있다
**피드백**
- 쇼츠처럼 넘길 수 있는 형식으로 가면 좋을듯
- 어느정도 익명성을 기대서 볼 수 있도록
- 원하는 토픽이나오면 채팅으로 대화를 한다거나 장치를 만드면 재밌을듯

## ⚠️ commit 컨벤션

- "{태그}: {커밋 메세지}" 형태로 작성

### 💡 예시

`feat: BOJ_1000.A+B 알고리즘 구현`<br/>
`fix: BOJ_1000.A+B 버그 수정`
<br/>
<br/>

| 태그     | 설명                                  |
| -------- | :------------------------------------ |
| feat     | 새로운 기능 추가                      |
| fix      | 버그 수정                             |
| refactor | 코드 리팩토링                         |
| comment  | 주석 추가(코드 변경 X) 혹은 오타 수정 |
| docs     | README와 같은 문서 수정               |
| merge    | merge                                 |
| rename   | 파일, 폴더명 수정 혹은 이동           |
