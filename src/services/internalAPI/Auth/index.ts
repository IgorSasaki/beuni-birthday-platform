import { AxiosInstance, AxiosResponse } from 'axios'

export class Auth {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public async login(email: string, password: string): Promise<AxiosResponse> {
    return this.instance.post('/auth', { email, password })
  }

  public async register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<AxiosResponse> {
    return this.instance.post('/users', {
      name,
      email,
      password,
      confirmPassword
    })
  }
}
