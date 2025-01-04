import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  // Primary key for the user table, auto-generated UUID
  @PrimaryGeneratedColumn('uuid')
  user_id: any;

  // User's mobile number, stored as a string
  @Column({ type: 'varchar', length: 15, nullable: true })
  mobile_number: string;

  // Flag to check if the user has verified their OTP
  @Column({ type: 'boolean', default: false })
  otp_verified: boolean;

  // Stores the user's profile details like name, email, etc. in JSON format
  @Column({ type: 'json', nullable: true })
  profile_details: object;

  // User's gender as a string
  @Column({ type: 'varchar', nullable: true })
  gender: string;

  // Array of user's interests, such as preferences in a dating app
  @Column('simple-array', { nullable: true })
  interests: string[];

  // Tracks the current stage of the signup process (e.g., 'mobile_number', 'otp_verified', 'profile_details')
  @Column({ type: 'varchar', length: 50, default: 'mobile_number' })
  signup_status: string;

  // Automatically populated timestamp when the record is created
  @CreateDateColumn()
  created_at: Date;

  // Automatically populated timestamp when the record is last updated
  @UpdateDateColumn()
  updated_at: Date;
}
