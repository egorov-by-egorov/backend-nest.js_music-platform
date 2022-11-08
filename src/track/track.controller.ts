import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment } from './schemas/comment.schema';
import { Track } from './schemas/track.schema';
import { TrackSwaggerSchema } from './swagger_schemas/track.swagger.schema';
import { TrackService } from './track.service';


@ApiTags( 'Tracks' )
@Controller( '/tracks' )
export class TrackController {

    constructor ( private trackService: TrackService ) {
    }

    @Post( '/create' )
    @ApiOperation( { summary: 'Create track' } )
    @ApiConsumes( 'multipart/form-data' )
    @ApiBody( {
        type: TrackSwaggerSchema
    } )
    @ApiResponse( { type: Track, status: HttpStatus.OK } )
    @UseInterceptors( FileFieldsInterceptor( [
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ] ) )
    create (
        @UploadedFiles() files: { picture?: Express.Multer.File[], audio?: Express.Multer.File[] },
        @Body() dto: CreateTrackDto
    ) {
        const { picture, audio } = files
        return this.trackService.create( dto, picture[ 0 ], audio[ 0 ] )
    }

    @Get( '/list' )
    @ApiOperation( { summary: 'Get all tracks' } )
    @ApiImplicitQuery( {
        name: 'page-number',
        required: false,
        type: Number,
    } )
    @ApiImplicitQuery( {
        name: 'page-size',
        required: false,
        type: Number,
    } )
    @ApiResponse( { type: [ Track ], status: HttpStatus.OK } )
    getAll (
        @Query( 'page-number' ) pageNumber: number,
        @Query( 'page-size' ) pageSize: number
    ) {

        return this.trackService.getAll( pageNumber < 2 ? 0 : pageNumber, pageSize )
    }

    @Get( '/:id' )
    @ApiOperation( { summary: 'Get single track' } )
    @ApiParam( {
        name: 'id',
        type: 'string',
        description: 'Unique id of track'
    } )
    @ApiResponse( {
        status: 200,
        description: 'The found record',
        type: Track,
    } )
    getOne ( @Param( 'id' ) id: ObjectId ) {
        return this.trackService.getOne( id )
    }

    @Delete( '/:id' )
    @ApiOperation( { summary: 'Delete track' } )
    @ApiParam( {
        name: 'id',
        type: 'string',
        description: 'Unique id of track'
    } )
    delete ( @Param( 'id' ) id: ObjectId ) {
        return this.trackService.delete( id )
    }

    @Delete( '/all' )
    @ApiOperation( { summary: 'Delete all tracks' } )
    deleteAll () {
        return this.trackService.deleteAll()
    }

    @Post( '/search' )
    @ApiOperation( { summary: 'Search tracks' } )
    search ( @Query( 'query' ) query: string ) {
        return this.trackService.search( query )
    }

    @Post( '/comments/create' )
    @ApiOperation( { summary: 'Create comment' } )
    @ApiBody( {
        type: Comment
    } )
    @ApiResponse( { type: Comment, status: HttpStatus.OK } )
    createComment (
        @Body() dto: CreateCommentDto
    ) {
        return this.trackService.createComment( dto )
    }

    @Post( '/listen/:id' )
    @ApiOperation( { summary: 'Set listen' } )
    @ApiParam( {
        name: 'id',
        type: 'string',
        description: 'Unique id of track'
    } )
    listen ( @Param( 'id' ) id: ObjectId ) {
        return this.trackService.listen( id )
    }
}
