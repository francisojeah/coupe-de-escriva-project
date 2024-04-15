import { Test, TestingModule } from '@nestjs/testing';
import { FixtureResultsController } from './matches.controller';
import { FixtureResultsService } from './matches.service';

describe('FixtureResultsController', () => {
  let controller: FixtureResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixtureResultsController],
      providers: [FixtureResultsService],
    }).compile();

    controller = module.get<FixtureResultsController>(FixtureResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
