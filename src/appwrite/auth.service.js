import conf from '../conf/config.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Fallback safety check
        let endpoint = conf.appwriteUrl;
        if (!endpoint || endpoint === "undefined" || !endpoint.startsWith("http")) {
            endpoint = "https://nyc.cloud.appwrite.io/v1";
        }

        let projectId = conf.appwriteProjectId;
        if (!projectId || projectId === "undefined") {
            projectId = "6a5f15af00289a0a1221";
        }

        console.log("Initializing Appwrite Auth with Endpoint:", endpoint, "and Project ID:", projectId);

        this.client
            .setEndpoint(endpoint)
            .setProject(projectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
