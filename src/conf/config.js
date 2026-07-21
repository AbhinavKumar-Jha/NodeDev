const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || "https://nyc.cloud.appwrite.io/v1"),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || "6a5f15af00289a0a1221"),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || "6a5f177f001dc733cf16"),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || "posts"),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || "blog-images"),
};


// we are doing it so that in production imports work as intended and it is available without using
// lenghty import.meta.vite.----

export default conf;
