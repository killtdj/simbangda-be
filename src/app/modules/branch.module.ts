import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '../../model/branch.entity';
import { BranchController } from '../controllers/v1/branch.controller';
import { BranchService } from '../services/v1/branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  providers: [BranchService],
  controllers: [BranchController],
  exports: [],
})
export class BranchModule {}
