import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  pin: number;
}

class AuthUserPinService {
  async execute({ pin }: AuthRequest) {
    // Verificar se o usuário com o pin existe
    const user = await prismaClient.user.findFirst({
      where: {
        pin: pin,
      },
    });

    if (!user) {
      throw new Error("Pin não é válido");
    }

    // Verificar se a chave JWT está disponível
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET não está definido");
    }

    // Criar o token JWT
    const token = sign(
      {
        pin: user.pin,
      },
      jwtSecret,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pin: user.pin,
      token: token,
    };
  }
}

export { AuthUserPinService };
