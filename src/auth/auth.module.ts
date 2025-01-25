import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth/auth.service';
import { User } from './entity/user.entity';
import { MessageService } from './services/message/message/message.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
controllers: [AuthController],
  providers: [AuthService, MessageService]
})
export class AuthModule {}
