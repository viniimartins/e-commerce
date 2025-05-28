import { NotFoundError } from '@common/errors'
import { env } from '@e-commerce/env'
import { RemoveBgService } from '@infra/services/remove-bg-service'
import { UPLOAD_FILE_REPOSITORY_TOKEN } from '@modules/files/constants'
import type {
  IUploadFile,
  IUploadFileUseCase,
} from '@modules/files/domain/use-cases'
import type { IUploadFileRepository } from '@modules/files/repositories'
import path from 'path'
import sharp from 'sharp'
import { inject, injectable } from 'tsyringe'

@injectable()
class UploadFileUseCase implements IUploadFileUseCase {
  constructor(
    @inject(UPLOAD_FILE_REPOSITORY_TOKEN)
    private readonly uploadFileRepository: IUploadFileRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(data: IUploadFile.Request): Promise<IUploadFile.Response> {
    const { file } = data

    const service = new RemoveBgService()

    if (!file) {
      throw new NotFoundError('No file uploaded')
    }

    const buffer = await file.toBuffer()

    const filename = `${Date.now()}-${path.parse(file.filename).name}.png`
    const filePath = `./images/${filename}`

    const processedBuffer = await service.removeBackground(buffer)

    await sharp(processedBuffer).png().toFile(filePath)

    const url = `${env.NEXT_PUBLIC_API_URL}/images/${filename}`

    const uploadedFile = await this.uploadFileRepository.upload({
      url,
    })

    return uploadedFile
  }
}

export { UploadFileUseCase }
