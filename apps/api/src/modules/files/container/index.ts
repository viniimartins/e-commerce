import {
  DELETE_FILE_REPOSITORY_TOKEN,
  FIND_FILE_BY_ID_REPOSITORY_TOKEN,
  UPLOAD_FILE_REPOSITORY_TOKEN,
} from '@modules/files/constants'
import { PrismaFileRepository } from '@modules/files/infra/prisma/repositories/prisma-file-repository'
import type {
  IDeleteFileRepository,
  IFindFileByIdRepository,
  IUploadFileRepository,
} from '@modules/files/repositories'
import { container } from 'tsyringe'

container.registerSingleton<IUploadFileRepository>(
  UPLOAD_FILE_REPOSITORY_TOKEN,
  PrismaFileRepository,
)

container.registerSingleton<IDeleteFileRepository>(
  DELETE_FILE_REPOSITORY_TOKEN,
  PrismaFileRepository,
)
container.registerSingleton<IFindFileByIdRepository>(
  FIND_FILE_BY_ID_REPOSITORY_TOKEN,
  PrismaFileRepository,
)
