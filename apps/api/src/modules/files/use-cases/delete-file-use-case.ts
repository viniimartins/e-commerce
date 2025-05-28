import { NotFoundError } from '@common/errors/not-found-error'
import {
  DELETE_FILE_REPOSITORY_TOKEN,
  FIND_FILE_BY_ID_REPOSITORY_TOKEN,
} from '@modules/files/constants'
import type {
  IDeleteFile,
  IDeleteFileUseCase,
} from '@modules/files/domain/use-cases'
import type {
  IDeleteFileRepository,
  IFindFileByIdRepository,
} from '@modules/files/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteFileUseCase implements IDeleteFileUseCase {
  constructor(
    @inject(DELETE_FILE_REPOSITORY_TOKEN)
    private readonly deleteFileRepository: IDeleteFileRepository,

    @inject(FIND_FILE_BY_ID_REPOSITORY_TOKEN)
    private readonly findFileByIdRepository: IFindFileByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(params: IDeleteFile.Request): Promise<IDeleteFile.Response> {
    const { fileId } = params

    const file = await this.findFileByIdRepository.findById({
      fileId,
    })

    if (!file) {
      throw new NotFoundError('File not found')
    }

    await this.deleteFileRepository.delete({
      fileId,
    })
  }
}

export { DeleteFileUseCase }
