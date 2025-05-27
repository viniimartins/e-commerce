import type { MultipartFile } from '@fastify/multipart'
import type { IFileEntity } from '@modules/files/domain/entities/file-entity'

namespace IUploadFile {
  export type Request = { file: MultipartFile | undefined }

  export type Response = IFileEntity
}

interface IUploadFileUseCase {
  execute: (params: IUploadFile.Request) => Promise<IUploadFile.Response>
}

export { IUploadFile, IUploadFileUseCase }
