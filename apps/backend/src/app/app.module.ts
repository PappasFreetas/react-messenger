import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'messenger',
      autoLoadEntities: true, // auto loads entities from project
      synchronize: true, // auto synchs the db schema (disable in prod)
    }),
    TypeOrmModule.forFeature([User]), // Register User entity
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
