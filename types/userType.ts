import { UserRole } from "./rolesType";

export type UserType = {
   id: string;
   email: string;
   emailVerified: boolean;
   name: string;
   image?: string | null;
   role: UserRole;
   status: string;
   createdAt: Date;
   updatedAt: Date;
};
