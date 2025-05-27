namespace IDeleteFile {
  export type Params = {
    fileId: string
  }

  export type Response = void
}

interface IDeleteFileRepository {
  delete: (params: IDeleteFile.Params) => Promise<IDeleteFile.Response>
}

export { IDeleteFile, IDeleteFileRepository }
