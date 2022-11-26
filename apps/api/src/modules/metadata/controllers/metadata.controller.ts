import {
  ErrorResponse,
  Metadata,
  pagerDetails,
  PagerInterface,
  ResponseInterfance,
  SessionGuard,
} from '@flexpay/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MetadataService } from '../services/metadata.service';

@Controller('api/metadata')
export class MetadataController {
  constructor(private readonly service: MetadataService) {}

  @UseGuards(SessionGuard)
  @Post()
  async create(
    @Body() data: Metadata,
    @Query() query: any,
    @Res() res: any,
    @Req() req: any,
  ): Promise<Metadata | ErrorResponse> {
    {
      return await this.service.create(
        {
          data: { ...data, createdBy: req.session.user } as Metadata,
          fields: query.fields,
          rest: true,
        },
        res,
      );
    }
  }

  @UseGuards(SessionGuard)
  @Get()
  async getMetadatas(
    @Query() query: any,
    @Res() res: ResponseInterfance,
  ): Promise<Metadata[] | ErrorResponse> {
    {
      const pager: PagerInterface = pagerDetails({
        page: query.page,
        pageSize: query.pageSize,
      });
      return await this.service.getMetadatas(
        {
          ...pager,
          fields: query.fields,
          rest: true,
        },
        res,
      );
    }
  }
  @UseGuards(SessionGuard)
  @Get(':id')
  async getMetadata(
    @Query() query: any,
    @Res() res: ResponseInterfance,
    @Param('id') id: string,
  ): Promise<Metadata | ErrorResponse> {
    {
      return await this.service.getMetadata(
        {
          id,
          fields: query.fields,
          rest: true,
        },
        res,
      );
    }
  }

  @UseGuards(SessionGuard)
  @Delete(':id')
  async delete(
    @Res() res: ResponseInterfance,
    @Param('id') id: string,
  ): Promise<Metadata | ErrorResponse> {
    {
      return await this.service.delete(
        {
          id,
        },
        res,
      );
    }
  }
}
