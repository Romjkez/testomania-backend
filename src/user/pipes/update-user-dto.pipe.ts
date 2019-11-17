import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserDtoPipe implements PipeTransform {
  transform(value: UpdateUserDto, metadata: ArgumentMetadata): UpdateUserDto {
    if (value.finishedTest &&
      (!value.finishedTest.id ||
        typeof value.finishedTest.id !== 'number' ||
        !value.finishedTest.result ||
        !value.finishedTest.result.length ||
        value.finishedTest.result.length < 1)
    ) {
      throw new BadRequestException('Specify correct value for `finishedTests` field.');
    }
    return value;
  }
}
