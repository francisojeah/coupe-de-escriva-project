import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamsDto } from './create-team.dto';

export class UpdateTeamsDto extends PartialType(CreateTeamsDto) {}


