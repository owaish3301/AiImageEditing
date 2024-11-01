/* eslint-disable react/prop-types */
export default function Slider({ label, value, onChange }) {
  const handleInputChange = (e) => onChange(Number(e.target.value));

  return (
    <div className="mb-4 flex flex-col">
      <label className="text-gray-700 mb-1">{label}:</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="512"
          max="1024"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          min="512"
          max="1024"
          value={value}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded w-20"
        />
      </div>
    </div>
  );
}