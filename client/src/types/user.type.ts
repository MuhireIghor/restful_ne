import { IModel } from "./base.type";

export interface IUser extends IModel {
    firstName:       string;
    lastName:    string;
    email:          string;

}

