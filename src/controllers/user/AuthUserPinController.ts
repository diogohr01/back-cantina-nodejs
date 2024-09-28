import { Request, Response } from "express";
import { AuthUserPinService } from "../../services/user/AuthUserPinService";

class AuthUserPinController{
    async handle(req: Request, res: Response){
        const {pin} = req.body;

        const authUserPinService = new AuthUserPinService();
        const auth = await authUserPinService.execute({
           pin
        }) 

        return res.json(auth)
    }
}

export {AuthUserPinController}