import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsArray, IsDateString, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Mobile number for user registration',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  mobile_number: string;
}

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Profile image URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  profile_image?: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: '1990-01-01',
  })
  @IsNotEmpty()
  @IsDateString()
  dob: string;
}

export class UpdateGenderDto {
  @ApiProperty({
    description: 'Gender to update',
    enum: ['Male', 'Female', 'Other'],
    example: 'Male',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['Male', 'Female', 'Other'], { message: 'Gender must be either Male, Female, or Other' })
  gender: string;
}
export class UpdateInterestsDto {
  @IsArray()
  @IsNotEmpty()
  interests: string[];
}

export class GetUserDto {
  @ApiProperty({
    description: 'User unique identifier (UUID)',
    example: 'cabc1234-efgh5678-ijkl9101-mnop1122',
  })
  user_id: string;

  @ApiProperty({
    description: 'User\'s mobile number',
    example: '1234567890',
    nullable: true,
  })
  mobile_number: string;

  @ApiProperty({
    description: 'Flag indicating if the user has verified their OTP',
    example: false,
  })
  otp_verified: boolean;

  @ApiProperty({
    description: 'User\'s profile details in JSON format',
    example: {
      first_name: 'John',
      last_name: 'Doe',
      profile_picture: 'https://example.com/image.jpg',
      email: 'john.doe@example.com',
    },
    nullable: true,
  })
  profile_details: object;

  @ApiProperty({
    description: 'User\'s gender',
    example: 'Male',
    nullable: true,
  })
  gender: string;

  @ApiProperty({
    description: 'List of the user\'s interests',
    example: ['Traveling', 'Reading', 'Fitness'],
    nullable: true,
  })
  interests: string[];

  @ApiProperty({
    description: 'The current stage of the user signup process',
    example: 'profile_details',
  })
  signup_status: string;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2025-01-01T10:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2025-01-01T10:00:00Z',
  })
  updated_at: Date;
}
