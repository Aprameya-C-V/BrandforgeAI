import { useCallback } from 'react';

export const useDownload = () => {
    const downloadFile = useCallback(async (dataUrl: string, filename: string) => {
        if (!dataUrl) return;

        try {
            // The fetch/blob/objectURL approach is more robust in sandboxed environments like iframes.
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download file using blob method, falling back:", error);
            // Fallback to the direct download method if the above fails
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, []);

    return downloadFile;
};
