import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateProfileDto, UpdateGenderDto, UpdateInterestsDto, GetUserDto, LoginDto } from '../dto/user.dto';

// Swagger decorator for creating a user
export function CreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user by mobile number' }),
    ApiBody({
      description: 'Mobile number for user registration',
      type: CreateUserDto,
      required: true,
    }),
    ApiResponse({
      status: 201,
      description: 'User successfully created.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input or missing data.',
    }),
  );
}


export function UpdatePassword() {
  return applyDecorators(
    // Swagger operation summary
    ApiOperation({ summary: 'Add user password' }),

    // Swagger body description
    ApiBody({
      description: 'Password update payload',
      schema: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            example: 'StrongPassword@123',
            description: 'New password for the user',
          },
        },
        required: ['password'],
      },
    }),

    // Swagger response for successful password update
    ApiResponse({
      status: 200,
      description: 'Password updated successfully.',
    }),

    // Swagger response for bad requests
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input or missing data.',
    }),

    // Swagger response for user not found
    ApiResponse({
      status: 404,
      description: 'User not found.',
    }),
  );
}
// Swagger decorator for verifying OTP
export function VerifyOtp() {
  return applyDecorators(
    ApiOperation({ summary: 'Verify OTP for a user' }),
    ApiResponse({
      status: 200,
      description: 'OTP verified successfully.',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found.',
    }),
  );
}

// Swagger decorator for updating profile details
export function UpdateProfile() {
  return applyDecorators(
    ApiOperation({ summary: 'Update profile details' }),
    ApiBody({
      description: 'Profile details to update',
      type: UpdateProfileDto,
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Profile updated successfully.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input or missing data.',
    }),
  );
}

// Swagger decorator for updating gender
export function UpdateGender() {
  return applyDecorators(
    ApiOperation({ summary: 'Update user gender' }),
    ApiBody({
      description: 'Gender to update',
      type: UpdateGenderDto,
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Gender updated successfully.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input or missing data.',
    }),
  );
}

// Swagger decorator for updating interests
export function UpdateInterests() {
  return applyDecorators(
    ApiOperation({ summary: 'Update user interests' }),
    ApiBody({
      description: 'Interests to update',
      type: UpdateInterestsDto,
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Interests updated successfully.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input or missing data.',
    }),
  );
}
// Swagger decorator for Getting All Users
export function GetAllUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({
      status: 200,
      description: 'Users get successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input or missing data.',
    }),
  );
}

// Swagger decorator for Getting  Users by mobile number
export function GetUserByMobileNumber() {
  return applyDecorators(
    ApiOperation({ summary: 'Fetch user details by mobile number' }),
    ApiParam({
      name: 'mobileNumber',
      description: 'Mobile number of the user to search for',
      example: '1234567890',
    }),
    ApiResponse({
      status: 200,
      description: 'User details retrieved successfully.',
      type: GetUserDto,
    }),
    ApiResponse({
      status: 404,
      description: 'User not found with this mobile number.',
    }),
    ApiResponse({
      status: 400,
      description: 'Error retrieving user.',
    }),
  );
}


// Swagger decorator for login user

export function loginUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Login user' }),
    ApiBody({
      description: 'Login user',
      type: LoginDto,
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'User login Successfully!',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input or missing data.',
    }),
  );
}
