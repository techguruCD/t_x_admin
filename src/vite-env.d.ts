/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_APP_ENV: string;
    VITE_API_BASEURL: string;
    // Add more variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
