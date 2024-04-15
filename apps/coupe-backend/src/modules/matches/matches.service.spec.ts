import { Test, TestingModule } from '@nestjs/testing';
import { FixtureResultsService } from './matches.service';

describe('FixtureResultsService', () => {
  let service: FixtureResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixtureResultsService],
    }).compile();

    service = module.get<FixtureResultsService>(FixtureResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
