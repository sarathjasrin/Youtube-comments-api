import { youtube_v3 } from 'googleapis'
import { AuthToken } from '@models/authModel'

export interface YoutubeModel {
  getAuthUrl(): string

  getToken(code: string): Promise<AuthToken>

  getCommentThreads(
    params: youtube_v3.Params$Resource$Commentthreads$List,
  ): Promise<youtube_v3.Schema$CommentThreadListResponse>

  getComment(
    params: youtube_v3.Params$Resource$Comments$List,
  ): Promise<youtube_v3.Schema$CommentListResponse>

  getChannelById(
    params: youtube_v3.Params$Resource$Channels$List,
  ): Promise<youtube_v3.Schema$ChannelListResponse>

  getPlaylistItems(
    params: youtube_v3.Params$Resource$Playlistitems$List,
  ): Promise<youtube_v3.Schema$PlaylistItemListResponse>

  getCredentials(): Credentials
}

export interface YoutubeServiceModel {
  getCommentsListByVideoId(
    videoId: string,
  ): Promise<YoutubeListResponse<CommentThreads>>

  getSingleCommentThread(
    commentId: string,
  ): Promise<YoutubeListResponse<CommentThreads>>

  getCommentByCommentId(
    commentId: string,
  ): Promise<YoutubeListResponse<Comments>>
}

export interface YoutubeListResponse<T> {
  nextPageToken: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: T[]
}

export interface CommentThreads {
  id: string
  snippet: {
    channelId: string
    videoId: string
    topLevelComment: Comments
    canReply: boolean
    totalReplyCount: number
    isPublic: boolean
  }
  replies: {
    comments: Comments[]
  }
}

export interface Comments {
  id: string
  snippet: {
    authorDisplayName: string
    authorProfileImageUrl: string
    authorChannelUrl: string
    authorChannelId: {
      value: string
    }
    textDisplay: string
    textOriginal: string
    parentId: string
    canRate: boolean
    viewerRating: 'none' | 'like'
    likeCount: number
    moderationStatus: 'published' | 'heldForReview' | 'rejected' | 'likelySpam'
    publishedAt: string
    updatedAt: string
  }
}
