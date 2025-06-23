import { AxiosInstance, AxiosResponse } from 'axios'

import { BirthdayFilter } from '@/app/(logged)/funcionarios/types'

export class Gifts {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public async listGifts(
    token: string,
    searchTerm: string,
    filters: BirthdayFilter = {}
  ): Promise<AxiosResponse> {
    const { department, status, month } = filters

    const cleanedFilters: BirthdayFilter = {
      month:
        typeof month === 'string' && month !== 'ALL'
          ? parseInt(month, 10)
          : undefined,
      department: department && department !== 'ALL' ? department : undefined,
      status: status && status !== 'ALL' ? status : undefined
    }

    const params = {
      searchText: searchTerm || undefined,
      ...cleanedFilters
    }

    return await this.instance.get('/gifts', {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async updateGiftStatus(giftId: string, status: string, token: string) {
    return await this.instance.put(
      `/gifts/${giftId}`,
      {
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
