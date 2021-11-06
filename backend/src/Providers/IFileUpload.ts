export interface IFile{
    name: string
    type: string
    content: ArrayBuffer
}

export interface IUploadedFile{
    Key: string
    Location: string
}

export interface IUploaderFile{
    upload(file: IFile) : Promise<IUploadedFile>
}