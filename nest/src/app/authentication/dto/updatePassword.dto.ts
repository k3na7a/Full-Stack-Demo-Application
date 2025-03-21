import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../decorators/match.decorator';
import { IsString, Matches } from 'class-validator';
import { PasswordValidation } from 'src/library/data/regex/validation.regex';

export class updatePasswordDto {
  @ApiProperty()
  @IsString()
  public readonly old_password!: string;

  @ApiProperty()
  @IsString()
  @Matches(PasswordValidation.regex, {
    message: PasswordValidation.message,
  })
  public readonly new_password!: string;

  @ApiProperty()
  @Match(updatePasswordDto, (s: updatePasswordDto) => s.new_password)
  public readonly confirm_new_password!: string;
}
