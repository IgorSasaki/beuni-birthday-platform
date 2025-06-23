import axios, { AxiosInstance } from 'axios'

import { Auth } from './Auth'
import { Dashboard } from './Dashboard'
import { Employee } from './Employee'
import { Gifts } from './Gifts'

export class InternalAPI {
  private instance: AxiosInstance

  auth: Auth
  dashboard: Dashboard
  employee: Employee
  gifts: Gifts

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL
    })

    this.auth = new Auth(this.instance)
    this.dashboard = new Dashboard(this.instance)
    this.employee = new Employee(this.instance)
    this.gifts = new Gifts(this.instance)
  }
}
