import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Comment } from './comment.schema';

export type TrackDocument = Track & mongoose.Document;

@Schema()
export class Track {

    @Prop()
    @ApiProperty( { example: 'string', description: 'Название песни' } )
    name: string;

    @Prop()
    @ApiProperty( { example: 'string', description: 'Имя исполнителя' } )
    artist: string;

    @Prop()
    @ApiProperty( { example: 'string', description: 'Текст песни' } )
    text: string;

    @Prop()
    @ApiProperty( { example: 1, description: 'Счетчик прослушиваний' } )
    listens: number;

    @Prop()
    @ApiProperty( { example: '/images/[id_picture].ext', description: 'url картинки' } )
    picture: string;

    @Prop()
    @ApiProperty( { example: '/audio/[id_audio].ext', description: 'url аудио дорожки' } )
    audio: string;

    @Prop( {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    } )
        //@ApiProperty( { example: '["string"]', description: 'Массив комментариев' } )
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass( Track );
