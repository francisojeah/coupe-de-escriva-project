import { PartialType } from '@nestjs/mapped-types';
import { PlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(PlayerDto) {}
