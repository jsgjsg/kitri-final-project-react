# 📝 계획 관리 시스템 (TodoList)

![작게](https://github.com/myqkq111/todo-project-backend/assets/169429248/9eae1bd4-9fe3-4cdd-9fc8-95e800ed50da)

### 왜 우리의 To-Do 리스트가 특별한가요?
<p> 캘린더를 사용할 때, 일상과 직장을 함께 관리하다 보면 오히려 복잡해지고 혼란스러워질 수 있습니다. 그래서 저희는 일상과 직장을 각각 구분하여 효율적으로 관리할 수 있는 To-Do 리스트를 구상하게 되었습니다.</p>

### 우리의 목표

<p>저희 To-Do 리스트 웹사이트는 여러분이 일상과 직장 생활을 체계적으로 관리하여 중요한 일을 놓치지 않도록 도와드립니다. 간편하고 직관적인 디자인 덕분에 누구나 쉽게 사용할 수 있습니다.</p>

----

## 📅 일정 2024.06.23 ~ 2024.07.08

### [기능 명세서](산출물/기능명세서.pdf)

| 구분             | 주기능    | 상세기능                     | 설명                                                                 |
|------------------------------|-----------|------------------------------|----------------------------------------------------------------------|
| 1. 회원가입     | 1.1 SNS 가입 | 1-1-1 사용자ID와 비밀번호 입력   | 해당 홈페이지에 회원가입을 하려는 사용자ID와 비밀번호를 저장하여 다음 로그인 시 접속 |
| 2. 로그인       | 2.1 로그인 | 2-1-1 로그인 상태 유지        | 홈페이지에 재접속시 로그인을 다시 할 필요없이 일정시간 유지하게 해주는 기능          |
|                 | 2.2 로그아웃 | 2-2-1 로그아웃 버튼 생성    | 로그아웃 버튼을 클릭 시 해당사이트에서 로그인상태를 해제                             |
|                 | 2.3 회원탈퇴 | 2-3-1 회원탈퇴 버튼 생성    | 회원탈퇴 시 다음 로그인 때 해당유저에게 대한 정보가 없으므로 "존재하지 않는 XX입니다" 라고 설명 |
|                 | 2.4 회원 정보 수정 | 2-4-1 회원 정보 수정 버튼 | 회원 정보를 수정할 수 있는 기능(비밀번호 변경기능)                                                 |
| 3. 일정 관리    | 3.1 일정 등록 | 3-1-1 등록버튼 생성         | 등록버튼을 눌렀을 시 새로운 일정을 추가할 수 있는 기능                            |
|                 | 3.2 일정 수정 | 3-2-1 수정버튼 생성         | 수정버튼을 눌렀을 시 해당 일정내용을 수정할 수 있는 기능                            |
|                 | 3.3 일정 삭제 | 3-3-1 삭제버튼 생성         | 삭제버튼을 눌렀을 시 해당 일정을 삭제할 수 있는 기능                               |
| 4. 검색 기능    | 4.1 날짜 검색 | 4-1-1 달력버튼 생성         | 지정한 날짜 기간 내에 있는 모든 일정을 출력                                    |
|                 | 4.2 키워드 검색 | 4-2-1 특정 키워드 검색    | 키워드만 입력하여 해당 키워드가 포함된 일정을 모두 출력                       |
| 5. 목록 분류    | 5.1 직장     | 5-1-1 드롭다운으로 선택     | 직장일 스케줄만 조회 가능 기능                                              |
|                 | 5.2 일상     | 5-2-1 드롭다운으로 선택     | 일상일 스케줄만 조회 가능 기능                                              |
|                 | 5.3 전체     | 5-3-1 드롭다운으로 선택     | 모든 스케줄 보기                                                        |
| 6. 필터 기능    | 6.1 미완료   | 6-1-1 미완료 탭 생성         | 미완료의 스케줄만 조회 가능한 기능                                           |
|                 | 6.2 주기적인 일 | 6-2-1 주기적인 일 탭 생성 | 주기적으로 반복 되는 스케줄 조회 기능                                    |
|                 | 6.3 중요     | 6-3-1 중요 탭 생성          | 중요 표시된 스케줄 조회 기능                                             |
|                 | 6.4 완료     | 6-4-1 완료 탭 생성          | 완료된 스케줄 조회 기능                                                   |



###  [06.23 계획서](산출물/6.23%20계획서.pdf)      |      [06.26 수정 디자인](산출물/06.26%20수정%20된%20디자인.pdf)      |      [06.27 수정 계획](산출물/06.27%20수정된%20계획.pdf)
----
<br>

## ⭐ [주요기능](산출물/주요기능.pdf)
<div style="display: flex; flex-wrap: wrap; justify-content: flex-start;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/b0a81793-e6fd-4b36-847f-1be79e7e382c" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/f8815263-bb16-4063-9d2a-af077e8f4a10" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/642f6a9f-06d5-4233-a0b9-68528f57b18b" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/8af79029-d880-4892-a5a4-11044bce0eff" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/f6bce8c9-b022-4699-9a4a-bdb164d7ca05" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/ae5682b8-58e9-44c9-878f-9ff08d5de392" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/b11d132d-147f-48f4-b2ea-0402468cece4" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/3e5d7db8-2624-4ba4-9208-64ad753eb4dd" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/78733d0e-fda1-469e-80df-dfd4e797f52f" alt="기능 이미지" style="width: 48%; margin: 1%;">
  <img src="https://github.com/myqkq111/todo-project-backend/assets/169429248/5993f801-7aed-459e-8bec-f8332418c22b" alt="기능 이미지" style="width: 48%; margin: 1%;">
</div>


----

## 🛠️ Tech Stacks
<div style="display: flex; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white" alt="Amazon EC2" style="margin-right: 10px; margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white" alt="Amazon S3" style="margin-right: 10px; margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="Node.js" style="margin-right: 10px; margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white" alt="Git" style="margin-right: 10px; margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white" alt="Tailwind CSS" style="margin-right: 10px; margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" alt="React" style="margin-right: 10px; margin-bottom: 10px;">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white" alt="MongoDB" style="margin-right: 10px; margin-bottom: 10px;">
</div>
 
----

## 😥 아쉬운 부분

<ul>
  <li>직장과 일상 만이 아닌 + 큰 카테고리를 추가하여 더 다양한 일정관리 서비스</li>
  <li>일정을 ex) 07.08 - 07.17로 기간으로 추가하고 메인화면에서도 같은 기간은 이어진 줄로 보여지는 서비스</li>
  <li>스마트폰이나 이메일로 알람 서비스</li>
</ul>

----
## 👥 구성원 및 담당 역할
🔧<b>BE</b>
<table>
  <tr>
    <td><b>이름</b></td>
    <td><b>개발 내용</b></td>
  </tr>
  <tr>
    <td>최준서</td>
    <td>검색 기능 API구현, 필터 기능 API 구현</td>
  </tr>
  <tr>
    <td>이명준</td>
    <td>JWT, 회원CRUD 기능 API 구현</td>
  </tr>
  <tr>
    <td>박승연</td>
    <td>테스트 코드 작성, 발표 자료 제작</td>
  </tr>
  <tr>
    <td>박진희</td>
    <td>일정CRUD 기능 API 구현, 일정 카테고리 기능 API 구현</td>
  </tr>
</table>

🖌️<b>FE</b>
<table>
  <tr>
    <td><b>이름</b></td>
    <td><b>개발 내용</b></td>
  </tr>
  <tr>
    <td>최준서</td>
    <td>전체적인 UI/기능 구현, 빌드 및 배포</td>
  </tr>
  <tr>
    <td>이명준</td>
    <td>회원CRUD UI/기능 구현, 빌드 및 배포</td>
  </tr>
  <tr>
    <td>박승연</td>
    <td>전체적인 UI 구현, 웹 디자인</td>
  </tr>
  <tr>
    <td>박진희</td>
    <td>일정CRUD UI/기능 구현</td>
  </tr>
</table>

----

## ✒ 프로젝트 회고

<ul>
  <li>최준서 👑</li>
  
  > Node.js와 React 익숙해지기

  처음으로 Node.js와 React를 사용하면서 많은 도전이 있었습니다. 초반에는 설정과 기본적인 기능 구현에서 어려움을 겪었지만, 실습을 통해 점차 익숙해졌습니다. 특히, React의 컴포넌트 구조와 상태 관리, Node.js의 비동기 처리와 Express 프레임워크를 활용한 서버 구축 방법을 배우는 데 중점을 두었습니다.
  
  > Jira 사용의 아쉬움
  
  프로젝트 협업 툴로 Jira를 사용했습니다. 그러나 팀원들이 모두 같은 공간에 있었기 때문에, 자연스럽게 얼굴을 맞대고 소통하는 경우가 많았습니다. 이로 인해 Jira의 기능을 충분히 활용하지 못한 점이 아쉬웠습니다. 예를 들어, 이슈를 등록하고 할당하는 대신 구두로 작업을 분담하고, 진행 상황을 직접 확인하며 조율하는 방식으로 진행되었습니다. 하지만 이러한 경험을 통해, 원격 근무나 분산된 팀 환경에서는 Jira와 같은 협업 도구의 중요성을 더욱 느끼게 되었습니다. 체계적으로 이슈를 관리하고, 작업의 우선순위를 명확히 하며, 기록을 남겨 팀원 간의 이해를 돕는 것이 얼마나 중요한지 깨달았습니다.

  > 초반 설계의 중요성

이번 프로젝트에서는 초반 설계를 충분히 하지 못해 여러 어려움을 겪었습니다.<br>
<b>코드 규칙 부재</b>: 코드 스타일과 규칙을 미리 정하지 않아, 팀원들이 작성한 코드가 일관되지 않고 난잡해졌습니다. 코드 리뷰 과정에서 불필요한 시간과 노력이 많이 소모되었습니다.<br>
<b>역할 분담 미흡</b>: 각 팀원의 역할과 책임을 명확하게 분담하지 않아, 중복 작업이 발생하거나 일부 작업이 누락되는 경우가 생겼습니다. 이로 인해 프로젝트 진행이 지연되기도 했습니다.<br>
이러한 문제들은 초반 설계와 계획의 중요성을 일깨워 주었으며, 앞으로의 프로젝트에서는 더 체계적이고 철저한 계획 수립이 필요하다는 것을 깨닫게 되었습니다.<br><br>
이번 프로젝트를 통해 얻은 경험은 앞으로의 개발 과정에 큰 도움이 될 것입니다. Node.js와 React에 대한 실무 경험을 쌓고, 협업 툴의 중요성을 배우며, 무엇보다 팀원들과의 소통이 가장 중요하다는 것을 깨달은 소중한 시간이었습니다.
  <br>
   <br>
  <li>이명준</li>
  CRUD작업에 여러가지 착오와 어려움을 겪었지만 해결해내었고, JWT토큰과 리프레시토큰에 대해 조금더 공부하게 되었습니다. 우리가 일반적으로 생성하거나 삭제하는 계정의 구조에 관하여 조금더 접근하게 되는 계기가 되었습니다.
  <br>
   <br>
  <li>박승연</li>
  계획을 세우고 이를 기반으로 작업을 나누어 진행하는 것이 얼마나 중요한지 깨달았습니다. 초기에는 막연하게 시작했지만, 점차 체계적으로 작업을 진행하면서 프로젝트가 순조롭게 진행되었습니다.
이번 경험을 통해 협업의 즐거움과 중요성을 다시 한 번 느낄 수 있었고, 앞으로의 프로젝트에서도 이번에 배운 것들을 잘 활용할 수 있을 것 같습니다.
   <br>
   <br>
  <li>박진희</li>
  간단한 CRUD작업을 했지만, 기능 구현은 금방인데, 화면과 연동 시킬 때 계속 문제가 떠서 수정하느라 별로 진행을 못한 것 같고 제가 한게 너무 없는 것 같아서 팀원들에게 죄송했습니다. 그래도 이 프로젝트를 하면서 많이 배울 수 있었던 것 같아서 좋았습니다.
</ul>



