import { PartialType } from '@nestjs/mapped-types';
import { FixtureResultDto } from './create-match.dto';

export class UpdateFixtureResultDto extends PartialType(FixtureResultDto) {}
