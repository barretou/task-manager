import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  protected jwtExpirationTimeInSeconds: number;
  private jwtSecret: string | undefined;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = Number(
      this.configService.get('JWT_EXPIRATION_TIME'),
    );
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  signIn(username: string, password: string): AuthDto {
    const user = this.usersService.findByName(username);

    if (!user) throw new UnauthorizedException();
    if (!bcryptCompareSync(password, user.password))
      throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: `${this.jwtExpirationTimeInSeconds}s`,
    });

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
