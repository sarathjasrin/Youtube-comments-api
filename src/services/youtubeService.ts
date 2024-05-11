import {
  YoutubeServiceModel,
  YoutubeModel,
  YoutubeListResponse,
  CommentThreads,
  Comments,
} from '@models/youtubeModels'
import BaseService from '@services/baseService'
import AuthService from '@services/authService'
import Utility from '@common/utility'
import { PostData, ValidateResponse } from '@models/commonModel'
import { container } from '@/di'
import { ResponseType } from '@/common/constants'

export default class YoutubeService
  extends BaseService
  implements YoutubeServiceModel
{
  private youtubeRepository: YoutubeModel

  private authService: AuthService

  private utility: Utility

  constructor() {
    super()
    this.youtubeRepository = container.get('repository.youtube')
    this.utility = container.get('utility')
    this.authService = container.get('service.auth')
  }

  async getCommentsListByVideoId(videoId: string) {
    const response = await this.youtubeRepository.getCommentThreads({
      auth: this.authService.getOauthClient(),
      part: ['id', 'snippet', 'replies'],
      videoId,
    })
    return response as YoutubeListResponse<CommentThreads>
  }

  async getSingleCommentThread(commentId: string) {
    const response = await this.youtubeRepository.getCommentThreads({
      part: ['snippet', 'replies'],
      id: [commentId],
    })
    return response as YoutubeListResponse<CommentThreads>
  }

  async getCommentByCommentId(commentId: string) {
    const response = await this.youtubeRepository.getComment({
      part: ['id', 'snippet'],
      id: [commentId],
    })
    return response as YoutubeListResponse<Comments>
  }

  async processRequest(method: string, postData: PostData) {
    try {
      const { isValid, message } = this.validateRequest(method, postData)
      if (!isValid) {
        return this.utility.apiRespone(ResponseType.WARNING, null, message)
      }

      let data
      switch (method) {
        case 'getCommentsListByVideoId':
          data = await this.getCommentsListByVideoId(
            postData.videoId.toString(),
          )
          break
        case 'getSingleCommentThread':
          data = await this.getSingleCommentThread('commentId')
          break
        case 'getCommentByCommentId':
          data = await this.getCommentByCommentId('commentId')
          break
        default:
          throw new Error('Method not found')
      }

      return this.utility.apiRespone(ResponseType.SUCCESS, data)
    } catch (e) {
      this.utility.handleCatchError(e)
      return this.utility.apiRespone(ResponseType.ERROR, null, 'Error occurred')
    }
  }

  public validateRequest(method: string, data: PostData): ValidateResponse {
    if (method === 'getCommentsListByVideoId') {
      return data.videoId !== undefined && data.videoId !== '' && data.videoId
        ? { isValid: true }
        : { isValid: false, message: 'videoId is required' }
    }

    return { isValid: true }
  }
}
