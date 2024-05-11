import { PostData, ValidateResponse } from '@models/commonModel'

export default abstract class BaseService {
  public abstract validateRequest(
    method: string,
    data: PostData,
  ): ValidateResponse

  public abstract processRequest(
    method: string,
    data: unknown,
  ): Promise<unknown>
}
