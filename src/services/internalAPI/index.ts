import axios, { AxiosInstance } from 'axios'

import { Auth } from './Auth'

export class InternalAPI {
  private instance: AxiosInstance

  auth: Auth

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL
    })

    this.auth = new Auth(this.instance)
  }
}
