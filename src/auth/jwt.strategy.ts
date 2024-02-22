import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'This is a secret key.'
    })
  }

  async validate(payload: any){
    console.log("payload: ", payload)
    return {userId: payload.sub, email: payload.email, role:payload.role}
  }
}