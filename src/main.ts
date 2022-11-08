import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create( AppModule )
        app.setGlobalPrefix( 'api/v1' )
        app.enableCors()

        const config = new DocumentBuilder()
            .setTitle( 'Media Platform API' )
            .setDescription( 'The media platform API description' )
            .setVersion( '1.1' )
            .build();
        const document = SwaggerModule.createDocument( app, config );
        SwaggerModule.setup( 'swagger/api', app, document );


        await app.listen( PORT );
        console.info( `Server application is running on:${ PORT }` )
    } catch ( e ) {
        console.error( e )
    }
}

start()
