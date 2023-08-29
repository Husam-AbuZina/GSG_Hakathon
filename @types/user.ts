export namespace NSUser {

    export enum RoleType {
        user = 'user',
        admin = 'admin'
    }

    export interface Item {
        id: string;
        fullName: string;
        email: string;
        password: string;
        role: RoleType;
        createdAt: Date;
    }

}