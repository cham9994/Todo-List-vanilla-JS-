// 모듈 import
import axios from 'axios'

// API 정보
const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const API_KEY = 'FcKdtJs202204'
const USER_NAME = 'KDT2_JangGyeongChan'

// DOM
const inputTextEl = document.querySelector('.input-text')
const formEl = document.querySelector('.todo-form')
const todoEl = document.querySelector('.todos-list')
const todoSection = document.querySelector('.task-list')
const checkEl = document.querySelector('#check')


// Todo 정보
let todos = []

// Event
formEl.addEventListener('submit', (e) => onSubmitTodo(e, inputTextEl.value))



// 처음 실행
async function onInit() {
  await getTodo()
  renderTodos(todos)
}

// 할 일 가져오기
async function getTodo() {
  const res = await axios({
    url: API_URL,
    method: 'GET',
    headers: {
      "content-type": "application/json",
      "apikey": API_KEY,
      'username': USER_NAME
    }
  })
  res.data.forEach((item) => todos.push(item))
  return todos
}


// 할 일 등록하기
async function createTodo(todosValue, orderNum) {
  const res = await axios({
    url: API_URL,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': API_KEY,
      'username': USER_NAME
    },
    data: { 
      title: todosValue,
      order: orderNum
    }
  })
  todos.push(res.data)
  renderTodos(todos)
}

function onSubmitTodo(e, todosValue) {
  e.preventDefault()
  createTodo(todosValue, todos.length + 1)
  inputTextEl.value = ''
  inputTextEl.focus()
}

// 할 일 삭제하기
async function deleteTodo(value) { 
  todos = todos.filter((item) => item.id !== value)
  const res = await axios({
    url: `${API_URL}/${value}`,
    method: 'DELETE',
    headers: {
      "content-type": "application/json",
      "apikey": API_KEY,
      'username': USER_NAME
    }
  })
  console.log(todos)
  renderTodos(todos)
}

// 할 일 완료
function todoDone () {
  const checkEl = document.querySelectorAll('#check')
  checkEl.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
      item.classList.toggle('todo-checked')
      item.classList.toggle('todo-unChecked')
    })
  })
}
  

// Rendering 함수
function renderTodos(todos) {
  const todosEl = todos.map((it) => /* html */`
    <li>
      <div>
        <span class="material-symbols-outlined" class="todo-unChecked" data-action='check' id='check'>
          radio_button_unchecked
        </span>
        <span>${it.title}</span>
      </div>
        <div>
          <button class="delete-btn" value=${it.id} >
            <span class="material-symbols-outlined" data-action='delete'>
              close
            </span>
          </button>
        </div>
    </li>
  `)
  const todoTitles = todosEl.join('')
  todoEl.innerHTML = todoTitles
  todoSection.append(todoEl)
}

todoEl.addEventListener('click', e => {
  if (e.target.dataset.action === 'delete') {
    const value = e.target.parentNode.value
    deleteTodo(value)
  }
})

onInit()