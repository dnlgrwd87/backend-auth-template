import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getUserByAuthId(authId: string): Promise<UserDTO> {
    return this.userRepo.findOne({ authId });
  }

  async createUser(user: CreateUserDTO) {
    return this.userRepo.save(user);
  }
}
