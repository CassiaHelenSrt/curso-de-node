import { Middleware } from "../../../core/router.ts";
import { CoreProvider } from "../../../core/utils/abstract.ts";
import { COOKIE_SID_KEY, SessionService } from "../services/session";

export class AuthMiddleware extends CoreProvider{
    session = new SessionService(this.core)


    optional: Middleware = async(req, res) => {
           const sid = req.cookies[COOKIE_SID_KEY];
              if(!sid) {
                return
              }
        
        
              const {valid, cookie, session} = this.session.validate(sid);
              res.setCookie(cookie)
        
              if(!valid || !session){
                return
              }
        
              res.setHeader('Cache-Control', 'private, no-store')
              res.setHeader('Vary','Cookie')
              req.session = session
    }
}