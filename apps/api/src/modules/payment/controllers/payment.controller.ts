import { Controller } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('api/payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}
}
