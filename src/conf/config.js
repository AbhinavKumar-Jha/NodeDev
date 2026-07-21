const cleanUrl = (rawUrl) => {
    if (!rawUrl || rawUrl === "undefined" || rawUrl === "null") {
        return "https://nyc.cloud.appwrite.io/v1";
    }

    // Extract raw URL if formatted as Markdown link: [url](url)
    const markdownMatch = rawUrl.match(/https?:\/\/[^\s\]\)]+/);
    let url = markdownMatch ? markdownMatch[0] : rawUrl;

    // Remove surrounding quotes, spaces, brackets, or parentheses
    url = url.replace(/["'\[\]\(\)]/g, "").trim();

    // Remove trailing slash if present
    if (url.endsWith("/")) {
        url = url.slice(0, -1);
    }

    return url;
};

const cleanString = (val, fallback) => {
    if (!val || val === "undefined" || val === "null") return fallback;
    return String(val).replace(/["'\[\]\(\)]/g, "").trim();
};

const conf = {
    appwriteUrl: cleanUrl(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: cleanString(import.meta.env.VITE_APPWRITE_PROJECT_ID, "6a5f15af00289a0a1221"),
    appwriteDatabaseId: cleanString(import.meta.env.VITE_APPWRITE_DATABASE_ID, "6a5f177f001dc733cf16"),
    appwriteCollectionId: cleanString(import.meta.env.VITE_APPWRITE_COLLECTION_ID, "posts"),
    appwriteBucketId: cleanString(import.meta.env.VITE_APPWRITE_BUCKET_ID, "6a5f198a001f70879fd9"),
};

export default conf;
