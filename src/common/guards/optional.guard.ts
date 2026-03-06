import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {

    constructor(private prisma: PrismaService) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        try {
            await super.canActivate(context);
        } catch {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        if (!req.user) return true;

        const role = await this.prisma.role.findUnique({
            where: { id: req.user.roleId },
            include: { permissions: true },
        });

        req.user.role = role;
        return true;
    }

    handleRequest(err, user) {
        return user || null;
    }
}