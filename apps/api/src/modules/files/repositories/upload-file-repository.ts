import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { IFileEntity } from '@modules/files/domain/entities/file-entity'

namespace IUploadFile {
  export type Params = WithoutEntityBaseProperties<IFileEntity>

  export type Response = IFileEntity
}

interface IUploadFileRepository {
  upload: (params: IUploadFile.Params) => Promise<IUploadFile.Response>
}

export { IUploadFile, IUploadFileRepository }
