import axios, { AxiosInstance } from 'axios'

import { CEP } from './CEP'

export class ExternalAPI {
  private instance: AxiosInstance

  cep: CEP

  constructor() {
    this.instance = axios.create()

    this.cep = new CEP(this.instance)
  }
}
