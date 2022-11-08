import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Track } from './track.schema';

export type CommentDocument = Comment & mongoose.Document;

@Schema()
export class Comment {

    @Prop()
    @ApiProperty( { example: 'Вася', description: 'Имя юзера' } )
    username: string;

    @Prop()
    @ApiProperty( { example: 'Комментарий', description: 'Текст комментария' } )
    text: string;

    @Prop()
    @ApiProperty( { example: '20.12.2022', description: 'Дата создания' } )
    createdAt: string;

    @Prop( {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    } )
    @ApiProperty( { example: 'id track', description: 'id трека' } )
    track: Track;

}

export const CommentSchema = SchemaFactory.createForClass( Comment );
