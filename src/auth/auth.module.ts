import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
