namespace IDeleteCategory {
  export type Params = { categoryId: string }

  export type Response = void
}

interface IDeleteCategoryRepository {
  delete: (params: IDeleteCategory.Params) => Promise<IDeleteCategory.Response>
}

export { IDeleteCategory, IDeleteCategoryRepository }
