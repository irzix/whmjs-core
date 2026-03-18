import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResendVerificationEmailDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './auth.dto';
import { AuthResponse, MessageResponse } from './auth.entity';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body.email, body.password);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent',
    type: MessageResponse,
  })
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successful',
    type: MessageResponse,
  })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(body.token, body.password);
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email using token' })
  @ApiResponse({
    status: 200,
    description: 'Email verified successful',
    type: MessageResponse,
  })
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return await this.authService.verifyEmail(body.token);
  }

  @Post('resend-verification-email')
  @ApiOperation({ summary: 'Resend verification email' })
  @ApiResponse({
    status: 200,
    description: 'Verification email resent',
    type: MessageResponse,
  })
  async resendVerificationEmail(@Body() body: ResendVerificationEmailDto) {
    return await this.authService.resendVerificationEmail(body.email);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'Return current user information' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Req() req) {
    return await this.authService.getMe(req.user.id);
  }
}
