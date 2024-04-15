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
import { FixtureResultsService } from './matches.service';
import { FixtureResultDto, SubstitutionDto, TeamLineupDto, UpdateStatsDto } from './dto/create-match.dto';
import { FixtureResultProps } from './interfaces/match.interfaces';
import { Response } from 'express';
import { UpdateFixtureResultDto } from './dto/update-match.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/middleware/authorization/roles.decorator';
import { VerifyLogin } from '@/middleware/authorization/verifylogin.strategy';
import { Role } from '../users/interfaces/user.interfaces';

@ApiTags('fixture-results')
@Controller('fixture-results')
export class FixtureResultsController {
  constructor(private readonly fixtureResultsService: FixtureResultsService) {}
  
  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Post()
  async createFixtureResult(
    @Body() createFixtureResultDto: FixtureResultDto,
    @Res() res: Response,
  ): Promise<Response<FixtureResultProps>> {
    try {
      const createdFixtureResult = await this.fixtureResultsService.create(createFixtureResultDto);
      return res.status(HttpStatus.CREATED).json(createdFixtureResult);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<FixtureResultProps>> {
    try {
      const fixtureResult = await this.fixtureResultsService.findById(id);
      return res.status(200).json(fixtureResult);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('')
  async findAll(@Res() res: Response): Promise<Response<FixtureResultProps[]>> {
    try {
      const fixtureResult = await this.fixtureResultsService.findAll();
      return res.status(200).json(fixtureResult);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Put('/result/:id')
  async updateResult(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const updatedFixtureResult = await this.fixtureResultsService.updateFixtureResult(id);
      return res.status(HttpStatus.OK).json(updatedFixtureResult);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  // // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Put('/stats/:id')
  async updateStats(
    @Param('id') id: string,
    @Body() updateStatsDto: UpdateStatsDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const updatedFixtureResult = await this.fixtureResultsService.updateStats(id, updateStatsDto);
      return res.status(HttpStatus.OK).json(updatedFixtureResult);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }


  // @UseGuards(VerifyLogin)y
  @Roles(Role.Admin)
  @Put('/lineup/:id')
  async addLineup(
    @Param('id') id: string,
    @Body() lineupDto: TeamLineupDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const updatedFixtureResult = await this.fixtureResultsService.addLineup(id, lineupDto);
      return res.status(HttpStatus.OK).json(updatedFixtureResult);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('/:seasonId/:division/:sport')
  async getFixtureResultBySeasonDivisionSport(
    @Param('seasonId') seasonId: string, // Using Types.ObjectId
    @Param('division') division: string,
    @Param('sport') sport: string,
    @Res() res: Response,
  ) {
    try {
      const matches = await this.fixtureResultsService.findBySeasonDivisionSport(
        seasonId,
        division,
        sport,
      );
      return res.status(HttpStatus.OK).json(matches);
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Put(':id/substitute')
  async makeSubstitution(
    @Param('id') id: string,
    @Body() substitutionDto: SubstitutionDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const updatedFixtureResult = await this.fixtureResultsService.makeSubstitution(id, substitutionDto);
      return res.status(HttpStatus.OK).json(updatedFixtureResult);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  // @UseGuards(VerifyLogin)
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFixtureResultDto: UpdateFixtureResultDto,
    @Res() res: Response,
  ): Promise<Response<FixtureResultProps>> {
    try {
      const updatedFixtureResult = await this.fixtureResultsService.update(
        id,
        updateFixtureResultDto,
      );
      return res.status(200).json(updatedFixtureResult);
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
      await this.fixtureResultsService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
