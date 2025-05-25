namespace IDeleteCategory {
  export type Request = {
    categoryId: string
  }

  export type Response = void
}

interface IDeleteCategoryUseCase {
  execute: (
    params: IDeleteCategory.Request,
  ) => Promise<IDeleteCategory.Response>
}

export { IDeleteCategory, IDeleteCategoryUseCase }
