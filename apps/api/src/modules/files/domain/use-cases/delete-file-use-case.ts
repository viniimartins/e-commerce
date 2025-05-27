namespace IDeleteFile {
  export type Request = {
    fileId: string
  }

  export type Response = void
}

interface IDeleteFileUseCase {
  execute: (params: IDeleteFile.Request) => Promise<IDeleteFile.Response>
}

export { IDeleteFile, IDeleteFileUseCase }
