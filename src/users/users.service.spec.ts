import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const mockUser = {  id: 1, 
  username: 'Test User',
  email: 'test@example.com',
  password: 'password123',
}  as User;

  const mockRepository = {
    create: jest.fn(dto => dto),
    save: jest.fn(user => Promise.resolve({ ...user, id: 1 })),
    findOneBy: jest.fn(({ id }) => {
      if (id === 1) return Promise.resolve(mockUser);
      return Promise.resolve(null);
    }),
    find: jest.fn(() => Promise.resolve([mockUser])),
    remove: jest.fn(user => Promise.resolve(user)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const dto = { name: 'New User' };
      const result = await service.create(dto as any);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = await service.findOne(1);
      expect(user).toEqual(mockUser);
    });

    it('should throw error if user not found', async () => {
      await expect(service.findOne(2)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual([mockUser]);
    });
  });

  describe('update', () => {
    it('should update and save a user', async () => {
      const dto = { username: 'Updated Name' };
      const result = await service.update(1, dto as any);
      expect(result).toHaveProperty('id');
      expect(result.username).toBe(dto.username);
    });

    it('should throw error if user to update not found', async () => {
      await expect(service.update(2, {} as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockUser);
      expect(repo.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw error if user to remove not found', async () => {
      await expect(service.remove(2)).rejects.toThrow(BadRequestException);
    });
  });
});
