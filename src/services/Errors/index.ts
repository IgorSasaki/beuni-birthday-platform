class AppError extends Error {
  public readonly status: number
  public readonly name: string

  constructor(message: string, status = 400) {
    super(message)

    this.name = 'AppError'
    this.status = status

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default AppError
