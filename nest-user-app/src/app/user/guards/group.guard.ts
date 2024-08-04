import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Group } from '../groups/groups.enum.js';
import { GROUPS_KEY } from '../decorators/groups.decorator.js';

@Injectable()
export class GroupGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Group[]>(
			GROUPS_KEY,
			[context.getHandler(), context.getClass()],
		);
		if (!requiredRoles) {
			return true;
		}

		console.log(requiredRoles);

		const { user } = context.switchToHttp().getRequest();

		console.log(user.groups);

		return requiredRoles.some((group) => user.groups?.includes(group));
	}
}
