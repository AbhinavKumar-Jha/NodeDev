const getEnv = (value, fallback) => {
    if (!value || value === "undefined" || value === "null") {
        return fallback;
    }
    let clean = String(value).trim().replace(/^["']|["']$/g, '');
    if (clean.endsWith('/')) {
        clean = clean.slice(0, -1);
    }
    return clean;
};

let rawUrl = getEnv(import.meta.env.VITE_APPWRITE_URL, "https://nyc.cloud.appwrite.io/v1");
if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
    rawUrl = `https://${rawUrl}`;
}

const conf = {
    appwriteUrl: rawUrl,
    appwriteProjectId: getEnv(import.meta.env.VITE_APPWRITE_PROJECT_ID, "6a5f15af00289a0a1221"),
    appwriteDatabaseId: getEnv(import.meta.env.VITE_APPWRITE_DATABASE_ID, "6a5f177f001dc733cf16"),
    appwriteCollectionId: getEnv(import.meta.env.VITE_APPWRITE_COLLECTION_ID, "posts"),
    appwriteBucketId: getEnv(import.meta.env.VITE_APPWRITE_BUCKET_ID, "6a5f198a001f70879fd9"),
};

export default conf;
