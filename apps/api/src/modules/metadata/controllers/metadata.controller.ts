import { ErrorResponse, Metadata, SessionGuard } from '@flexpay/common';
import {
  Body,
  Controller,
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
}
