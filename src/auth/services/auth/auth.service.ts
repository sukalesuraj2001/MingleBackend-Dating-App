import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, catchError, from, map, of } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { CreateUserDto, GetUserDto, LoginDto } from 'src/auth/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // In-memory store (like session storage)
  private otpStore = new Map<string, { otp: number, expiresAt: number }>();

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


  // Create a new user password
  updatePassword(userId: string, password: string): Observable<void> {
    const saltRounds = 10; // Number of salt rounds for bcrypt

    return from(
      this.userRepository.findOne({ where: { user_id: userId } }).then((user) => {
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Hash the password before saving
        return bcrypt.hash(password, saltRounds).then((hashedPassword) => {
          user.password = hashedPassword;
          user.signup_status = 'add-password';
          return this.userRepository.save(user).then(() => { });
        });
      }),
    );
  }

  // send otp 

  // Generate OTP and store it in memory with expiry time (1 minute validity)
  sendOtp(userId: string): Observable<any> {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    const expiresAt = Date.now() + 60000; // OTP expires in 1 minute (60000 ms)

    // Store OTP and expiry time in memory (acting as session storage)
    this.otpStore.set(userId, { otp, expiresAt });

    return from(
      this.userRepository.findOne({ where: { user_id: userId } }).then(user => {
        if (user) {
          return { otp, expiresAt };
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  // Verify OTP using the in-memory store
  verifyOtp(userId: string, inputOtp: number): Observable<any> {
    const otpData = this.otpStore.get(userId);

    if (otpData) {
      // Check if OTP has expired
      if (Date.now() > otpData.expiresAt) {
        this.otpStore.delete(userId); // OTP expired, clear from store
        throw new HttpException('OTP expired', HttpStatus.BAD_REQUEST);
      }
      if (otpData.otp === inputOtp) {
        this.otpStore.delete(userId); // Clear OTP after successful validation
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
      } else {
        throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
      }
    }
    throw new HttpException('OTP not found for this user', HttpStatus.BAD_REQUEST);
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


  // get user data on the basis of mobie number 

  getUserByMobileNumber(mobileNumber: string): Observable<GetUserDto> {
    return from(
      this.userRepository.findOne({ where: { mobile_number: mobileNumber } }).then((user) => {
        if (!user) {
          throw new HttpException(
            { success: false, message: 'User not found with this mobile number.' },
            HttpStatus.NOT_FOUND,
          );
        }
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
      }),
    );
  }



  login(loginDto: LoginDto): Observable<{ success: boolean; message: string; token?: string }> {
    return from(
      this.userRepository.findOne({ where: { mobile_number: loginDto.mobile_number } })
    ).pipe(
      map((user) => {
        if (!user) {
          throw new Error('User not found');
        }

        // Type assertion to ensure TypeScript knows this is a User object
        const foundUser = user as User;

        // Compare password using bcrypt
        const isPasswordValid = bcrypt.compareSync(loginDto.password, foundUser.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // // Generate JWT token
        // const token = jwt.sign({ user_id: foundUser.user_id, mobile_number: foundUser.mobile_number }, 'yourSecretKey', {
        //   expiresIn: '1h',
        // });

        return {
          success: true,
          message: 'Login successfully',
          // token,
        };
      }),
      catchError((error) => {
        return of({
          success: false,
          message: error.message || 'Error during login',
        });
      }),
    );
  }
}


