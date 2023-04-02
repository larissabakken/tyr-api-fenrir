import { Injectable } from '@nestjs/common';
import { OwnersService } from 'src/app/owners/owners.service';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ownerExists', async: true })
@Injectable()
export class OwnerExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly ownerService: OwnersService) {}

  async validate(value: string) {
    const owner = await this.ownerService.findOne(value);

    if (!owner) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Owner does not exist';
  }
}
