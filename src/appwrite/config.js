import { Client, ID, TablesDB, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  table;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.table = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ slug, title, content, featuredimage, status, userid }) {
    try {
      return await this.table.createRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug || ID.unique(),
        {
          title,
          content,
          featuredimage,
          status,
          userid,
        },
      );
    } catch (error) {
      console.error("createPost error:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    if (!slug) {
      throw new Error("Post ID (slug) is required for delete");
    }
    try {
      await this.table.deleteRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );
      return true;
    } catch (error) {
      console.error("deletePost error:", error);
     
      return false;
    }
  }

  async getPost(slug) {
    if (!slug) {
      throw new Error("Post ID (slug) is required to get post");
    }
    try {
      return await this.table.getRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );
    } catch (error) {
      console.error("getPost error:", error);
       return false;
     
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.table.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries,
      );
    } catch (error) {
      console.error("getPosts error:", error);
      
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    if (!slug) {
      throw new Error("Post ID (slug) is required for update");
    }
    try {
      return await this.table.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        },
      );
    } catch (error) {
      console.error("updatePost error:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      const response = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
      
      return response;
    } catch (error) {
      console.error("Failed to upload file:", error);
     throw error;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Failed to upload file:", error);
      return false;
    }
  }

  getFileView(fileId) {
    try {
      if (!fileId) return "";
      return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Failed to view file:", error);
    }
  }
}

const service = new Service();
export default service;
