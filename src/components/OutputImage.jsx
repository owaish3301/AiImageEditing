import { Download } from "lucide-react";

export default function OutputImage({ imageUrl, generationErrorMessage }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="mt-4 text-center">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Generated output"
            className="w-full max-w-md mx-auto rounded shadow-md mb-4"
          />
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            <Download className="w-4 h-4" />
            Download Image
          </button>
        </>
      ) : (
        <p className="text-red-500">{generationErrorMessage || ""}</p>
      )}
    </div>
  );
}