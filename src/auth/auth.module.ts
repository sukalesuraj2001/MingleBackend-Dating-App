import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth/auth.service';
import { User } from './entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
