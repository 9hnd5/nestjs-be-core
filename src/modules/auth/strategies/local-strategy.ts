import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SessionService } from '~/modules/session/session.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private sessionService: SessionService) {
        super({ usernameField: 'accesstoken' });
    }

    validate(accesstoken: string) {
        console.log('accesstoken', accesstoken);
        return true;
    }
}
