import { Controller, Post, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateUser, VerifyOtp, UpdateProfile, UpdateGender, UpdateInterests, GetAllUsers, UpdatePassword, GetUserByMobileNumber, loginUser } from 'src/auth/decorators/auth.decorator';
import { CreateUserDto, UpdateProfileDto, UpdateGenderDto, UpdateInterestsDto, GetUserDto, PasswordDto, LoginDto } from 'src/auth/dto/user.dto';
import { User } from 'src/auth/entity/user.entity';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Endpoint to create a new user
    @CreateUser()
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Observable<{ success: boolean; message: string }> {
        return this.authService.createUser(createUserDto).pipe(
            map(() => {
                return { success: true, message: 'Mobile number added successfully.' };
            }),
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: error.response.message || 'Error creating user. Please try again.' },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }


    // Endpoint to update password 
    @UpdatePassword()
    @Post('update-password/:userId')
    updatePassword(
        @Param('userId') userId: string,
        @Body() passwordDto: PasswordDto,
    ): Observable<{ success: boolean; message: string }> {
        return this.authService.updatePassword(userId, passwordDto.password).pipe(
            map(() => {
                return { success: true, message: 'Password updated successfully.' };
            }),
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: 'Error updating password. Please try again.' },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }

    // Endpoint to verify OTP
    @VerifyOtp()
    @Post('verify-otp/:userId')
    verifyOtp(@Param('userId') userId: string): Observable<{ success: boolean; message: string }> {
        return this.authService.verifyOtp(userId).pipe(
            map((user) => {
                return { success: true, message: 'OTP verified successfully.' };
            }),
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: 'Error verifying OTP. Please try again.' },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }

    // Endpoint to update profile details
    @UpdateProfile()
    @Post('update-profile/:userId')
    updateProfile(
        @Param('userId') userId: string,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Observable<{ success: boolean; message: string }> {
        return this.authService.updateProfile(userId, updateProfileDto).pipe(
            map(() => {
                return { success: true, message: 'Profile updated successfully.' };
            }),
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: 'Error updating profile. Please try again.' },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }

    // Endpoint to update gender
    @UpdateGender()
    @Post('update-gender/:userId')
    updateGender(
        @Param('userId') userId: string,
        @Body() updateGenderDto: UpdateGenderDto,
    ): Observable<{ success: boolean; message: string }> {
        return this.authService.updateGender(userId, updateGenderDto.gender).pipe(
            map(() => {
                return { success: true, message: 'Gender updated successfully.' };
            }),
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: 'Error updating gender. Please try again.' },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }

    // Endpoint to update interests
    @UpdateInterests()
    @Post('update-interests/:userId')
    updateInterests(
        @Param('userId') userId: string,
        @Body() updateInterestsDto: UpdateInterestsDto,
    ): Observable<{ success: boolean; message: string }> {
        return this.authService.updateInterests(userId, updateInterestsDto.interests).pipe(
            map(() => {
                return { success: true, message: 'Interests updated successfully.' };
            }),
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: 'Error updating interests. Please try again.' },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }

    @GetAllUsers()
    @Get('users')
    getAllUsers(): Observable<GetUserDto[]> {
        return this.authService.getAllUsers().pipe(
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: 'Error retrieving users.' },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }),
        );
    }
    @GetUserByMobileNumber()
    @Get('get-user-by-mobile/:mobileNumber')
    getUserByMobileNumber(
        @Param('mobileNumber') mobileNumber: string,
    ): Observable<GetUserDto> {
        return this.authService.getUserByMobileNumber(mobileNumber).pipe(
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    {
                        success: false,
                        message: error?.message || 'Error retrieving user. Please try again.',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }

    @loginUser()
    @Post('login')
    login(@Body() loginDto: LoginDto): Observable<{ success: boolean; message: string; token?: string }> {
        return this.authService.login(loginDto).pipe(
            catchError((error) => {
                console.error(error);
                throw new HttpException(
                    { success: false, message: 'Invalid credentials or error logging in. Please try again.' },
                    HttpStatus.BAD_REQUEST,
                );
            }),
        );
    }

}
