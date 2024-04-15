import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { TeamsService } from './teams.service';
import { CreateTeamsDto } from './dto/create-team.dto';
import { TeamsProps } from './interfaces/team.interfaces';
import { UpdateTeamsDto } from './dto/update-team.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyLogin } from '@/middleware/authorization/verifylogin.strategy';
import { Role } from '../users/interfaces/user.interfaces';
import { Roles } from '@/middleware/authorization/roles.decorator';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createTeamsDto: CreateTeamsDto,
    @Res() res: Response,
  ): Promise<Response<TeamsProps>> {
    try {
      const createdTeams = await this.teamsService.create(createTeamsDto);
      return res.status(201).json(createdTeams);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<TeamsProps>> {
    try {
      const team = await this.teamsService.findById(id);
      return res.status(200).json(team);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('')
  async findAll(@Res() res: Response): Promise<Response<TeamsProps[]>> {
    try {
      const teams = await this.teamsService.findAll();
      return res.status(200).json(teams);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeamsDto: UpdateTeamsDto,
    @Res() res: Response,
  ): Promise<Response<TeamsProps>> {
    try {
      const updatedTeams = await this.teamsService.update(id, updateTeamsDto);
      return res.status(200).json(updatedTeams);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<void>> {
    try {
      await this.teamsService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
