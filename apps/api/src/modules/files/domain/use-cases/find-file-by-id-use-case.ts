import type { IFileEntity } from '@modules/files/domain/entities/file-entity'

namespace IFindFileById {
  export type Request = {
    fileId: string
  }

  export type Response = IFileEntity
}

interface IFindFileByIdUseCase {
  execute: (params: IFindFileById.Request) => Promise<IFindFileById.Response>
}

export { IFindFileById, IFindFileByIdUseCase }
