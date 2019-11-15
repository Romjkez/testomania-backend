import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserDtoPipe implements PipeTransform {
  transform(value: UpdateUserDto, metadata: ArgumentMetadata): UpdateUserDto {
    if (value.finishedTests &&
      (!value.finishedTests.id ||
        typeof value.finishedTests.id !== 'number' ||
        !value.finishedTests.result ||
        !value.finishedTests.result.length ||
        value.finishedTests.result.length < 1)
    ) {
      throw new BadRequestException('Specify correct value for `finishedTests` field.');
    }
    return value;
  }
}
