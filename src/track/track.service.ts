import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from '../file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {

    constructor (
        @InjectModel( Track.name ) private trackModel: Model<TrackDocument>,
        @InjectModel( Comment.name ) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) {
    }

    async create ( dto: CreateTrackDto, picture, audio ): Promise<Track> {
        const picturePath = this.fileService.createFile( FileType.IMAGE, picture )
        const audioPath = this.fileService.createFile( FileType.AUDIO, audio )
        return await this.trackModel.create( {
            ...dto,
            listens: 0,
            picture: picturePath,
            audio: audioPath
        } )
    }

    async getAll ( pageNumber, pageSize ): Promise<Track[]> {
        return await this.trackModel.find().skip( pageNumber ).limit( pageSize ).exec()
    }

    async getOne ( id: ObjectId ): Promise<Track> {
        return await this.trackModel.findById( id ).populate( {
            path: 'comments',
            options: {
                sort: {
                    createdAt: 'desc'
                }
            }
        } ).exec()
    }

    async delete ( id: ObjectId ) {
        return await this.trackModel.findByIdAndDelete( id ).exec()
    }

    async deleteAll (): Promise<DeleteResult> {
        return this.trackModel.deleteMany();
    }

    async createComment ( dto: CreateCommentDto ): Promise<Comment> {
        const track = await this.trackModel.findById( dto.trackID ).exec()
        const comment = await this.commentModel.create( {
            ...dto,
            createdAt: new Date().toJSON()
        } )
        track.comments.push( comment._id )
        await track.save()
        return comment
    }

    async listen ( id: ObjectId ): Promise<void> {
        const track = await this.trackModel.findById( id ).exec();
        track.listens += 1
        track.save()
    }

    async search ( query: string = '' ): Promise<Track[]> {
        return await this.trackModel.find( {
            name: { $regex: new RegExp( query, 'i' ) }
        } ).exec()
    }
}
