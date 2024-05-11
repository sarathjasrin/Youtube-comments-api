import { ContainerBuilder } from 'node-dependency-injection'

// Import Repositories
import YoutubeRepository from '@repositories/youtubeRepository'

// Import services
import AuthService from '@services/authService'
import YoutubeService from '@services/youtubeService'

import Utility from '@common/utility'
import ApiRouter from './routes/apiRouter'

export const container = new ContainerBuilder()

// Register services
container.register('service.auth', AuthService)
container.register('service.api', ApiRouter)
container.register('service.youtube', YoutubeService)

// Register repositories
container.register('repository.youtube', YoutubeRepository)

// Others
container.register('utility', Utility)

export default container
