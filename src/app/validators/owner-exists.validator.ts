import { Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'ownerExists', async: true })
@Injectable()
export class OwnerExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly ownerService: OwnerService) {}

  async validate(value: string) {
    const owner = await this.ownerService.findById(value);

    if (!owner) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Owner does not exist';
  }
}