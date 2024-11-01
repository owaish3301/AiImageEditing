/* eslint-disable react/prop-types */

export default function PromptInput({ prompt, setPrompt }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">Prompt:</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Enter prompt here..."
      />
    </div>
  );
}
