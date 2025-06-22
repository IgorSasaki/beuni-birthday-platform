import axios, { AxiosInstance } from 'axios'

import { Auth } from './Auth'
import { Dashboard } from './Dashboard'

export class InternalAPI {
  private instance: AxiosInstance

  auth: Auth
  dashboard: Dashboard

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL
    })

    this.auth = new Auth(this.instance)
    this.dashboard = new Dashboard(this.instance)
  }
}
