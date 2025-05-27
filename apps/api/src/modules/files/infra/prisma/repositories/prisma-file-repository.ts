/* eslint-disable prettier/prettier */

import { prisma } from '@lib/prisma'
import type {
  IDeleteFile,
  IDeleteFileRepository,
  IFindFileById,
  IFindFileByIdRepository,
  IUploadFile,
  IUploadFileRepository,
} from '@modules/files/repositories'

class PrismaFileRepository
  implements
  IUploadFileRepository,
  IDeleteFileRepository,
  IFindFileByIdRepository {
  async upload({ ...data }: IUploadFile.Params): Promise<IUploadFile.Response> {
    const file = await prisma.image.create({
      data: {
        ...data,
      },
    })

    return file
  }

  async findById({
    fileId,
  }: IFindFileById.Params): Promise<IFindFileById.Response> {
    const file = await prisma.image.findUnique({
      where: { id: fileId },
    })

    return file
  }

  async delete({ fileId }: IDeleteFile.Params): Promise<IDeleteFile.Response> {
    await prisma.image.delete({
      where: { id: fileId },
    })
  }
}

export { PrismaFileRepository }
