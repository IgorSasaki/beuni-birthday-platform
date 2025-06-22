import { AxiosInstance, AxiosResponse } from 'axios'

export class Dashboard {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public async getDashboard(token: string): Promise<AxiosResponse> {
    return this.instance.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
