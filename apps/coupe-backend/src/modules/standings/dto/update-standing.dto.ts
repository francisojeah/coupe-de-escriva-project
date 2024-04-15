import { PartialType } from '@nestjs/mapped-types';
import { StandingDto } from './create-standing.dto';

export class UpdateStandingsDto extends PartialType(StandingDto) {}
