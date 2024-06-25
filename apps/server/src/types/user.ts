export interface IUser {
    id: number;
    email: string;
    number: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    accounts: IAccount[];
}

export interface IAccount {
    id: number;
    accountNumber: string;
    balance: IBalance;
}

export interface IBalance {
    id: number;
    amount: number;
    locked: number;
}