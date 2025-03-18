import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class MessageService {



    private readonly client;

    constructor() {
      // Initialize Twilio client with your credentials
      this.client = twilio(
        process.env.TWILIO_ACCOUNT_SID,  // Your Twilio Account SID
        process.env.TWILIO_AUTH_TOKEN,   // Your Twilio Auth Token
      );
    }
  
    async sendSms(phoneNumber: string, message: string): Promise<any> {
      try {
        // Send SMS using Twilio
        const response = await this.client.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
          to: phoneNumber,
        });
  
        return response; // Return the response from Twilio
      } catch (error) {
        throw new Error(`Failed to send SMS: ${error.message}`);
      }
    }




    
}
