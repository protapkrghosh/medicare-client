import { UserRole } from "./rolesType";
import { UserStatus } from "./userStatus";

export type SessionUser = {
   id: string;
   name: string;
   email: string;
   image?: string | null | undefined;
   role: UserRole;
   status: UserStatus;
   emailVerified: boolean;
   createdAt: Date;
   updatedAt: Date;
};

export type UserInfo = {
   name: string;
   email: string;
   image: string | null;
   role: UserRole;
   status: UserStatus;
};
