# 📌 할 일 관리(Todo) 프로젝트

- 과제 기한:
  - 과제 수행 기간: 05월 19일(목) ~ 06월 09일(목)
  - 코드 리뷰 기간: 06월 09일(목) ~ 06월 17일(금)
- 내용:
  - 주어진 API를 활용해 할 일 관리 프로젝트를 만들어보세요.

## 요구사항

### 필수 요구사항

- [x] 할 일 목록(list)을 조회(Read)할 수 있어야 합니다.
- [x] 할 일 항목(item)을 추가(Create)할 수 있어야 합니다.
- [x] 할 일 항목을 수정(Update)할 수 있어야 합니다.
- [x] 할 일 항목을 삭제(Delete)할 할 수 있어야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### 선택 요구사항

- [x] 할 일 항목의 순서를 바꿀 수 있도록 만들어 보세요.
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해 보세요.
- [x] 할 일을 완료한 항목을 한번에 삭제할 수 있도록 만들어 보세요.
- [x] 할 일 항목의 최신 수정일을 표시해 보세요.
- [x] 최초 API 요청(Request)에 대한 로딩 애니메이션을 추가해 보세요.
- [x] SCSS, Bootstrap 등을 구성해 프로젝트를 최대한 예쁘게(?) 만들어 보세요.

# 순수 자바스크립트로 만든 TODO LIST

## Preview

![todo-list-min](https://user-images.githubusercontent.com/90392240/171791932-1a194a82-1a63-42ae-bb56-eba661b52305.gif)

> 주소: https://sunny-kitsune-9282de.netlify.app/

## API 요청

- API 요청 문서를 자세히 살펴보고 GET, POST, PUT, DELETE 각각의 요청을 보냈습니다.

- axios를 통해서 API 통신을 했습니다. JS 기본 Promise보다 손쉽게 데이터를 처리할 수 있었습니다.

- API 문서를 자세히 살펴봐야 한다는 것을 배웠습니다. 요구사항을 제대로 충족하지 않아 500 에러를 많이 만났습니다.

- 요청할 때 중복되는 코드는 request 함수로 따로 만들어서 중복 코드를 줄였습니다.

- Update를 담당하는 PUT 호출이 신경쓸게 많고 까다로워서 많은 시간을 할애했습니다.

- try catch 문으로 API 통신시 발생할 수 있는 이슈를 처리했습니다.

## UI 컨셉

- 최대한 간단하고 깔끔하게 구성하고 싶었습니다. 그래서 여러 버튼을 두지 않고 기능들을 구현할 수 있도록 초점을 맞췄습니다.

- 리스트 작성 시간 또한 바로 보이지 않게 숨겼습니다.

## 리스트 글 수정

> **contenteditable**

- 모달창을 띄워 수정하는 것은 사용자 경험에 좋지 못하다고 판단했기 때문에 Input창을 띄우려고 했는데 좋은 방법을 발견했습니다.

- HTML 속성에 'contenteditable'이라는 속성이 있다는 것 아셨나요?

- `contenteditable="true"` 라고 설정하면 텍스트가 들어있는 태그 자체가 수정가능하게 바뀝니다.

- 따로 Input창이나 모달창을 띄우지 않아도 됩니다.

```html
<span
  id="todo-text"
  class="todo-text-false"
  data-action="edit"
  data-title="2022.6.3.오후2:22"
  contenteditable="true"
  >공부하기</span
>
```

![contenteditable](https://user-images.githubusercontent.com/90392240/171794646-42cf48c0-8fd3-4424-a6bd-6cf8d402e353.png)

- textarea와 비슷한 모양으로 바로 수정할 수 있는 칸이 만들어집니다.

## 날짜 정보 표시

> **tooltip**

- 리스트에는 최대한 할 일만 나타내게 하고싶었기 때문에 tooltip을 통해서는 작성시간을 표시했습니다.

- tooltip은 태그 속성으로 `title`을 주면 나타납니다.

- CSS 속성 선택자를 통해 스타일링 또한 가능합니다.

- 날짜 데이터는 UCT 기준이어서 `.LocaleString()` 메서드를 통해서 현지 시간으로 바꿔줬습니다. -> 대부분의 API의 날짜데이터는 UTC라는 것을 알았습니다.

```css
[data-title] {
  position: relative;
  cursor: help;
}
```

## Drag & Drop

> **[sortable js](https://github.com/SortableJS/Sortable)**

- 드래그하여 리스트 순서를 바꾸는 것은 `Sortable js`를 사용했습니다.

- 적용하는 것은 어렵지 않은데 바꾼 순서를 서버에 재정렬 하는 것이 까다로웠습니다.

- 바뀐 순서를 재정렬 하지 않으면 UI 상에 순서가 바뀌어도 서버에서는 순서가 그대로이기 때문에 새로고침 시 원래 순서로 돌아가게 됩니다.

- API 설명에 목록 순서 변경이 있는 것을 못보고 많은 시간을 낭비하게 됩니다..(API 설명 정독 하자!)

```js
// 드래그하여 리스트 순서 변경
let sortable = Sortable.create(todoEl, {
  animation: 150,
  onEnd: function () {
    const idList = []
    const todoLiEl = document.querySelectorAll('.todoLi')
    todoLiEl.forEach((item) => {
      idList.push(item.getAttribute('value'))
    })
    putOrderTodo(idList)
  }
})
```

- 리스트에 설정해둔 `value`(id 값입니다)를 배열로 만들어 reorder로 요청하면 바뀐 순서를 반영할 수 있습니다.

## 느낀점

- API 통신을 주고 받으면서 그 활용법을 익힐 수 있었습니다.

- 처음에는 요청 보내는 것 조차 어떻게 해야하나 막막했는데 구글링과 API 문서 들여다보고 하면서 어떻게든 되었네요.

- 오히려 받아온 데이터를 가공해서 원하는 대로 UI로 나타내는 것이 훨씬 어렵다는 것을 느꼈습니다.

- 혼자 공부하고 고민하는 시간이 중요하다는 것을 깨달았습니다.

- 고민하는 시간이 시간낭비라고 생각이 들 수도 있지만 그 과정에서 배우는 것이 많다고 느꼈습니다.

- 쉽게 얻은 지식은 쉽게 잊어버립니다. 에러와의 긴 싸움에서 이겨서 많은 수확을 얻을 수 있으면 좋을 것 같습니다!
