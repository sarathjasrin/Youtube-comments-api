export interface AuthToken {
  access_token: string
  refresh_token: string
  token_type: string
  expiry_date: number
  scope: string
}

export interface AuthModel {}

export interface Credentials {
  installed: {
    client_id: string
    project_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_secret: string
    redirect_uris: string[]
    javascript_origins: string[]
  }
}
