import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class TrackSwaggerSchema {

    @Prop()
    @ApiProperty( { example: 'string', description: 'ID' } )
    _id: string;
    
    @Prop()
    @ApiProperty( { example: 'Numb', description: 'Название песни' } )
    name: string;

    @Prop()
    @ApiProperty( { example: 'Linkin park', description: 'Имя исполнителя' } )
    artist: string;

    @Prop()
    @ApiProperty( { example: 'Text Song', description: 'Текст песни' } )
    text: string;

    @Prop()
    @ApiProperty( { example: '1', description: 'Счетчик прослушиваний' } )
    listens: number;

    @ApiProperty( {
        type: 'string',
        format: 'binary',
        description: 'url картинки',
    } )
    @Prop()
    picture: string;

    @Prop()
    @ApiProperty( {
            type: 'string',
            format: 'binary',
            description: 'url аудио дорожки'
        }
    )
    audio: string;

}
