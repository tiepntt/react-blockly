import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        preserveSymlinks: true, // this is the fix!
        alias: [
            {
                find: /^(components|types|helper|assets|icons)([^]*)/, // Sử dụng regex để tìm các đường dẫn bắt đầu bằng '/components/'
                replacement: "/src/$1$2", // Thay thế bằng đường dẫn tương ứng trong thư mục /src/components/
            },
        ],
    },
});
