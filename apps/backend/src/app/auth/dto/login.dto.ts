import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * DTO for validating login input
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
