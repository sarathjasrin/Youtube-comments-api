import * as fs from 'fs'
import { YoutubeModel } from '@models/youtubeModels'
import { AuthToken, Credentials } from '@models/authModel'
import { OAuth2Client } from 'google-auth-library'
import { google, youtube_v3 } from 'googleapis'
import { SCOPE } from '@common/constants'

export default class YoutubeRepository implements YoutubeModel {
  private oAuth2Client: OAuth2Client

  private credentials: Credentials

  private service: youtube_v3.Youtube

  constructor() {
    this.credentials = this.getCredentials()
    const clientId = this.credentials.installed.client_id
    const clientSecret = this.credentials.installed.client_secret
    const redirectUri = this.credentials.installed.redirect_uris[0]
    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri,
    )
    this.service = google.youtube('v3')
  }

  getAuthUrl(): string {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPE,
    })
  }

  async getCommentThreads(
    params: youtube_v3.Params$Resource$Commentthreads$List,
  ): Promise<youtube_v3.Schema$CommentThreadListResponse> {
    const response = await this.service.commentThreads.list(params)
    return response.data
  }

  async getComment(
    params: youtube_v3.Params$Resource$Comments$List,
  ): Promise<youtube_v3.Schema$CommentListResponse> {
    const response = await this.service.comments.list(params)
    return response.data
  }

  async getToken(code: string): Promise<AuthToken> {
    const response = await this.oAuth2Client.getToken(code)
    return response.tokens as AuthToken
  }

  getCredentials(): Credentials {
    try {
      const content = fs.readFileSync('api-credentials.json')
      return JSON.parse(content.toString())
    } catch (error) {
      throw new Error(`Error loading client secret file: ${error}`)
    }
  }
}
