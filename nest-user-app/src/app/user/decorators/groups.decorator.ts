import { SetMetadata } from '@nestjs/common';
import { Group } from '../groups/groups.enum.js';

export const GROUPS_KEY = 'groups';
export const Groups = (...roles: Group[]) => SetMetadata(GROUPS_KEY, roles);
