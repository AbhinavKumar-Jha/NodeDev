import {Client, Account, ID} from "appwrite";
import conf from "../conf/config";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){//destructing object containing all
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // method call
                return this.login({email, password});
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        // eslint-disable-next-line no-useless-catch
        try {
            console.log("Creating email/password session for:", email);
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Session created:", session);
            return session;
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",  error);
            throw error;
        }
        // return null;//in case the account get method fails to return an error;
    }

    async logout(){
        // eslint-disable-next-line no-useless-catch
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;