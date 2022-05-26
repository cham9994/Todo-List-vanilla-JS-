// 모듈 import
import axios from 'axios'

// API 정보
const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const API_KEY = 'FcKdtJs202204'
const USER_NAME = 'GyeongChan'

// 할 일 등록하기
async function createTodo() {
  const res = await axios({
    url: API_URL,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': API_KEY,
      'username': 'GyeongChan'
    },
    data: {
      'title': '처음으로 포스트를 날려봅니다!'
    }
  })
  console.log(res)
}

// createTodo()

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
  return res
}

// 할 일 삭제하기
async function deleteTodo(id) {
  const res = await axios({
    url: `${API_URL}/${id}`,
    method: 'DELETE',
    headers: {
      "content-type": "application/json",
      "apikey": API_KEY,
      'username': USER_NAME
    }
  })
  return res
}