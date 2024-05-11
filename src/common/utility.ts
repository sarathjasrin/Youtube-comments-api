export default abstract class Utility {
  handleCatchError = (error: unknown) => {
    let errorMessage = ''
    if (typeof error === 'string') {
      errorMessage = error
    } else if (error instanceof Error) {
      errorMessage = error.message
    }
    console.error(errorMessage, error)
  }

  apiRespone(type: string, data: unknown, message?: string) {
    return {
      type,
      message,
      data,
    }
  }
}
