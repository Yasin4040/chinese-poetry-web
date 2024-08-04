import axios from 'axios'

const API_URL = '你的诗歌API地址'

export function getPoems(query) {
  return axios.get(API_URL, { params: { query } })
}
