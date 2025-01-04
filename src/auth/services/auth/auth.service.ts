import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { CreateUserDto, GetUserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  // Create a new user
  createUser(createUserDto: CreateUserDto): Observable<User> {
    const { mobile_number } = createUserDto;

    return from(
      this.userRepository.findOne({ where: { mobile_number } }).then((existingUser) => {
        if (existingUser) {
          // If a user with the same mobile number exists, throw an error
          throw new HttpException(
            { success: false, message: 'Mobile number already in use.' },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          const user = this.userRepository.create({
            mobile_number,
            signup_status: 'mobile_number',
          });
          return this.userRepository.save(user);
        }
      })
    );
  }

  // Verify OTP
  verifyOtp(userId: string): Observable<User> {
    return from(
      this.userRepository.findOne({ where: { user_id: userId } }).then(user => {
        if (user) {
          user.otp_verified = true;
          user.signup_status = 'otp_verified';
          return this.userRepository.save(user);
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  // Update profile details
  updateProfile(userId: string, profileDetails: object): Observable<User> {
    return from(
      this.userRepository.findOne({ where: { user_id: userId } }).then(user => {
        user.profile_details = profileDetails;
        user.signup_status = 'profile_details';
        return this.userRepository.save(user);
      }),
    );

  }

  // Update gender
  updateGender(userId: string, gender: string): Observable<User> {
    return from(
      this.userRepository.findOne({ where: { user_id: userId } }).then(user => {
        user.gender = gender;
        user.signup_status = 'gender';
        return this.userRepository.save(user);
      }),
    );
  }

  // Update interests
  updateInterests(userId: string, interests: string[]): Observable<User> {
    return from(
      this.userRepository.findOne({ where: { user_id: userId } }).then(user => {
        user.interests = interests;
        user.signup_status = 'interests';
        return this.userRepository.save(user);
      }),
    );
  }



getAllUsers(): Observable<GetUserDto[]> {
    return from(
      this.userRepository.find().then((users) => {
        return users.map((user) => {
          return {
            user_id: user.user_id,
            mobile_number: user.mobile_number,
            otp_verified: user.otp_verified,
            profile_details: user.profile_details,
            gender: user.gender,
            interests: user.interests,
            signup_status: user.signup_status,
            created_at: user.created_at,
            updated_at: user.updated_at,
          };
        });
      }),
    );
  }
}
