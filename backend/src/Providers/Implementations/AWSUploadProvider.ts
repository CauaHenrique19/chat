import { S3 } from "aws-sdk";
import { IFile, IUploadedFile, IUploaderFile } from "../IFileUpload";
import crypto from 'crypto'

export class AWSUploadProvider implements IUploaderFile{
    private client: S3

    constructor(){
        this.client = new S3()
    }

    async upload(file: IFile) : Promise<IUploadedFile>{
        const hash = crypto.randomBytes(16).toString('hex')
        const key = `${hash}-${file.name}`

        const { Key, Location } : IUploadedFile = await this.client
            .upload({ 
                Bucket: 'jm-chat',
                Key: key,
                Body: file.content,
                ContentType: file.type,
                ACL: 'public-read'
            })
            .promise()

        return { Key, Location }
    }
}