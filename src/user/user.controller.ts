import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  HttpCode,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as admin from 'firebase-admin';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('current')
  async getCurrentUser(
    @Headers('Authorization') authorization: string,
    @Res() res: Response,
  ) {
    try {
      const authId = await this.extractAuthIdFromToken(authorization);
      const user = await this.userService.getUserByAuthId(authId);

      return res.json(user || null);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @HttpCode(201)
  async createUser(
    @Headers('Authorization') authorization: string,
    @Body() user: CreateUserDTO,
  ) {
    let authId: string;

    try {
      authId = await this.extractAuthIdFromToken(authorization);
    } catch {
      throw new UnauthorizedException('Error decoding token');
    }

    try {
      await this.userService.createUser({ email: user.email, authId });

      return 'User created successfully';
    } catch {
      await admin.auth().deleteUser(authId);
      throw new BadRequestException('Error creating user');
    }
  }

  private async extractAuthIdFromToken(authorization: string) {
    const token = authorization.split('Bearer ')[1];
    const currentUser = await admin.auth().verifyIdToken(token);

    return currentUser.uid;
  }
}
