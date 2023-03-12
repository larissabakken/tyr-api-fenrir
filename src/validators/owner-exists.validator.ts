import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { OwnerService } from 'src/owner/owner.service';
  import { Injectable } from '@nestjs/common';
  
  @ValidatorConstraint({ name: 'OwnerExists', async: true })
  @Injectable()
  export class OwnerExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly ownerService: OwnerService) {}
  
    async validate(ownerId: string, args: ValidationArguments) {
      if (!ownerId) {
        return false;
      }
  
      const owner = await this.ownerService.findOne(ownerId);
  
      return !!owner;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Owner with id $value does not exist';
    }
  }
  