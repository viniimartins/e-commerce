import type { IFileEntity } from '@modules/files/domain/entities/file-entity'

namespace IFindFileById {
  export type Params = {
    fileId: string
  }

  export type Response = IFileEntity | null
}

interface IFindFileByIdRepository {
  findById: (params: IFindFileById.Params) => Promise<IFindFileById.Response>
}

export { IFindFileById, IFindFileByIdRepository }
