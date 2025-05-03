

export interface User {
  id: number
  token: string
  name: string
  email: string
}

export interface sign_up {
  name: string
  email: string
  password: string
}

export interface login_api {
  email: string
  password: string
}