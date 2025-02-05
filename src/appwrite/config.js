import conf from "../conf/conf";
import { Storage, Client, ID, Databases, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client;
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
//changes
    // async createPost(slug, { title, content, featuredImage, status, userId }) {
        
    //     try {
    //         if (featuredImage && typeof featuredImage !== "string") {
                
    //             const fileResponse = await this.uploadFile(featuredImage);
    //             featuredImage = fileResponse.$id;
    //         }
    //         return await this.databases.createDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredImage,
    //                 status,
    //                 userId, 
    //             }
    //         );
    //     } catch (error) {
    //         console.error("Error in createPost:", error);
    //         throw error;
    //     }
    // }

    async createPost(slug, { title, content, featuredImage, status, userId }) {
        try {
            if (featuredImage && typeof featuredImage !== "string") {
                const fileResponse = await this.uploadFile(featuredImage);
                featuredImage = fileResponse.$id;
            }
    
            // ✅ Ensure content is a string and limit it to 255 characters
            const validContent = String(content).substring(0, 255);
    
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content: validContent,  
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("Error in createPost:", error);
            throw error;
        }
    }
    

    async updatePost({ title, slug, content, featuredImage, status }) {
        try {
            if (featuredImage && typeof featuredImage !== "string") {
                const fileResponse = await this.uploadFile(featuredImage);
                featuredImage = fileResponse.$id;
            }
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Error in updatePost:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.error("Error in deletePost:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.error("Error in getPost:", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.error("Error in getPosts:", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.error("Error in uploadFile:", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Error in deleteFile:", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.error("Error in getFilePreview:", error);
        }
    }
}

const service = new Service();
export default service;