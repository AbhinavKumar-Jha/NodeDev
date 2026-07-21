const getEnv = (value, fallback) => {
    if (!value || value === "undefined" || value === "null") {
        return fallback;
    }
    // Convert to string, trim spaces, and strip wrapping quotes if present
    let cleanValue = String(value).trim().replace(/^["']|["']$/g, '');
    
    // Remove trailing slash if present (e.g., https://.../v1/ -> https://.../v1)
    if (cleanValue.endsWith('/')) {
        cleanValue = cleanValue.slice(0, -1);
    }
    
    return cleanValue;
};

const conf = {
    appwriteUrl: getEnv(import.meta.env.VITE_APPWRITE_URL, "https://nyc.cloud.appwrite.io/v1"),
    appwriteProjectId: getEnv(import.meta.env.VITE_APPWRITE_PROJECT_ID, "6a5f15af00289a0a1221"),
    appwriteDatabaseId: getEnv(import.meta.env.VITE_APPWRITE_DATABASE_ID, "6a5f177f001dc733cf16"),
    appwriteCollectionId: getEnv(import.meta.env.VITE_APPWRITE_COLLECTION_ID, "posts"),
    appwriteBucketId: getEnv(import.meta.env.VITE_APPWRITE_BUCKET_ID, "6a5f198a001f70879fd9"),
};

export default conf;
