import conf from '../conf/config.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        const endpoint = (conf.appwriteUrl && conf.appwriteUrl !== "undefined")
            ? conf.appwriteUrl
            : "https://nyc.cloud.appwrite.io/v1";

        const projectId = (conf.appwriteProjectId && conf.appwriteProjectId !== "undefined")
            ? conf.appwriteProjectId
            : "6a5f15af00289a0a1221";

        this.client
            .setEndpoint(endpoint)
            .setProject(projectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    getDatabaseId() {
        return (conf.appwriteDatabaseId && conf.appwriteDatabaseId !== "undefined")
            ? conf.appwriteDatabaseId
            : "6a5f177f001dc733cf16";
    }

    getCollectionId() {
        return (conf.appwriteCollectionId && conf.appwriteCollectionId !== "undefined")
            ? conf.appwriteCollectionId
            : "posts";
    }

    getBucketId() {
        return (conf.appwriteBucketId && conf.appwriteBucketId !== "undefined")
            ? conf.appwriteBucketId
            : "6a5f198a001f70879fd9";
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                this.getDatabaseId(),
                this.getCollectionId(),
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                this.getDatabaseId(),
                this.getCollectionId(),
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                this.getDatabaseId(),
                this.getCollectionId(),
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                this.getDatabaseId(),
                this.getCollectionId(),
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                this.getDatabaseId(),
                this.getCollectionId(),
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async getPostforHome(userId, queries = [Query.equal("status", "active")]) {
        try {
            const finalQueries = [...queries, Query.equal("userId", userId)];
            return await this.databases.listDocuments(
                this.getDatabaseId(),
                this.getCollectionId(),
                finalQueries
            );
        } catch (error) {
            console.error("Appwrite service :: getPostforHome :: error", error);
            return false;
        }
    }

    // Storage methods
    async uploadFile(file) {
        try {
            const actualFile = (file && file[0]) ? file[0] : file;

            if (!actualFile) {
                console.error("Appwrite service :: uploadFile :: No valid file provided");
                return false;
            }

            return await this.bucket.createFile(
                this.getBucketId(),
                ID.unique(),
                actualFile
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            if (!fileId) return true;
            await this.bucket.deleteFile(
                this.getBucketId(),
                fileId
            );
            return true;
        } catch (error) {
            console.warn("Appwrite service :: deleteFile :: File not found or already deleted", error);
            return false;
        }
    }

   getFilePreview(fileId) {
    try {
        if (!fileId || fileId === "undefined" || fileId === "null") return "";
        
        // Appwrite Storage SDK preview method
        const result = this.bucket.getFilePreview(
            this.getBucketId(),
            fileId
        );

        return typeof result === "string" ? result : result.href;
    } catch (error) {
        console.error("Appwrite service :: getFilePreview :: error", error);
        return "";
    }
}

const service = new Service();
export default service;
