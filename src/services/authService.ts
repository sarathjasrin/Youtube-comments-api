import { Request } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { AuthToken, Credentials } from '@models/authModel'
import { YoutubeModel } from '@models/youtubeModels'
import container from '@/di'

class AuthService {
  private YoutubeRepository: YoutubeModel

  private credentials: Credentials

  private oAuth2Client: OAuth2Client

  userToken: AuthToken = {
    access_token: '',
    token_type: '',
    refresh_token: '',
    scope: '',
    expiry_date: 0,
  }

  constructor() {
    this.YoutubeRepository = container.get('repository.youtube')
    this.credentials = this.YoutubeRepository.getCredentials()
    const clientId = this.credentials.installed.client_id
    const clientSecret = this.credentials.installed.client_secret
    const redirectUri = this.credentials.installed.redirect_uris[0]
    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri,
    )
  }

  set setUserToken(token: AuthToken) {
    this.userToken = token
  }

  get getUserToken() {
    return this.userToken
  }

  getOauthClient() {
    this.oAuth2Client.setCredentials(this.userToken)
    return this.oAuth2Client
  }

  refreshTokenIfExpired(req: Request): Promise<void> {
    this.oAuth2Client.setCredentials({
      refresh_token: this.userToken.refresh_token,
    })
    if (this.isTokenExpired()) {
      this.oAuth2Client.refreshAccessToken().then((response) => {
        req.session.auth = response.credentials as AuthToken
        req.session.save((err) => {
          if (err) {
            console.error(err)
          }
          return Promise.resolve()
        })
      })
    }
    return Promise.resolve()
  }

  async authorize(code: string): Promise<AuthToken | null> {
    const token = await this.YoutubeRepository.getToken(code).catch((error) => {
      console.error(error)
      return null
    })
    return token
  }

  private isTokenExpired() {
    if (this.userToken.expiry_date) {
      const now = new Date().getTime()
      if (now > this.userToken.expiry_date) {
        return true
      }
    }
    return false
  }
}

export default AuthService
