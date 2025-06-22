import { AxiosInstance, AxiosResponse } from 'axios'

import AppError from '@/services/Errors'

export class CEP {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public formatCEP(cep: string): string {
    const cleanCep = cep.replace(/\D/g, '')

    return cleanCep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
  }

  public async getAddressByCEP(cep: string): Promise<AxiosResponse> {
    const formattedCEP = this.formatCEP(cep)

    try {
      const response = await this.instance.get(
        `https://viacep.com.br/ws/${formattedCEP}/json/`
      )

      return response
    } catch (error) {
      console.error({ getAddressByCEPError: error })

      throw new AppError(`Error fetching address for CEP ${formattedCEP}`)
    }
  }
}
