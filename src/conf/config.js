const getEnv = (value, fallback) => {
    if (!value || value === "undefined" || value === "null") {
        return fallback;
    }
    return String(value);
};

const conf = {
    appwriteUrl: getEnv(import.meta.env.VITE_APPWRITE_URL, "https://nyc.cloud.appwrite.io/v1"),
    appwriteProjectId: getEnv(import.meta.env.VITE_APPWRITE_PROJECT_ID, "6a5f15af00289a0a1221"),
    appwriteDatabaseId: getEnv(import.meta.env.VITE_APPWRITE_DATABASE_ID, "6a5f177f001dc733cf16"),
    appwriteCollectionId: getEnv(import.meta.env.VITE_APPWRITE_COLLECTION_ID, "posts"),
    appwriteBucketId: getEnv(import.meta.env.VITE_APPWRITE_BUCKET_ID, "blog-images"),
};

// export default conf;

// we are doing it so that in production imports work as intended and it is available without using
// lenghty import.meta.vite.----

export default conf;
