import {Role} from "../auth/enums/role.enum";

export class User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
}
