import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            uri: `mongodb+srv://${configService.get('MONGODB_USER')}:${configService.get('MONGODB_PASSWORD')}@${configService.get('MONGODB_HOST')}/${configService.get('MONGODB_DEFAULT_DB')}?retryWrites=true&w=majority&appName=Cluster0`,
        }),
    }),]
})
export class DatabaseModule {
}
