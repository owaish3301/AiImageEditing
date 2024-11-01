/* eslint-disable react/prop-types */

export default function OutputImage({ imageUrl, generationErrorMessage }) {
  return (
    <div className="mt-4 text-center">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Generated output"
            className="w-full max-w-md mx-auto rounded shadow-md mb-4"
          />
          <a
            href={imageUrl}
            download="generated-image.png"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Download Image
          </a>
        </>
      ) : (
        <p className="text-gray-500">{generationErrorMessage ? (generationErrorMessage) : ""}</p>
      )}
    </div>
  );
}
