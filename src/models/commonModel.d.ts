export type PostData = {
  [key: string]: string | number | boolean
}

export interface ValidateResponse {
  isValid: boolean
  message?: string
}
