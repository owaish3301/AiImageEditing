
import { useState } from "react";
import { Client } from "@gradio/client";
import ImageUploader from "./components/ImageUploader";
import Slider from "./components/Slider";
import PromptInput from "./components/PromptInput";
import OutputImage from "./components/OutputImage";
import { Instagram } from 'lucide-react';
import LogConsole from "./components/LogConsole";

function App() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [prompt, setPrompt] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [generationErrorMessage, setGenerationErrorMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);

  const handleGenerate = async () => {
    if (!image || !prompt) return;

    setIsGenerating(true);
    setLogs([]);
    setIsConsoleVisible(true);
    setGenerationErrorMessage(null)

    let client;
    try {
      client = await Client.connect("lllyasviel/iclight-v2", {
        events: ["status", "data"]
      });
    } catch (error) {
      setGenerationErrorMessage("Error connecting to the server");
      // console.error('Error connecting to gradio client', error);
      setIsGenerating(false);
      return;
    }

    const logStatus = (message) => {
      if (message.stage === "error") {
        setIsGenerating(false);
        setGenerationErrorMessage("An error occurred during the generation process.");
      }
        const logMessage = `Status: ${JSON.stringify(message, null, 2)}`;
        setLogs((prevLogs) => [...prevLogs, logMessage]);
        // console.log(message.stage);
      };

    try {
      const job = await client.submit("/process", {
      input_fg: image,
      bg_source: "None",
      prompt,
      image_width: width,
      image_height: height,
      num_samples: 1,
      seed: 12345,
      steps: 25,
      n_prompt: "",
      cfg: 1,
      gs: 3.5,
      rs: 1,
      enable_hr_fix: true,
      hr_downscale: 0.5,
      lowres_denoise: 0.98,
      highres_denoise: 0.95,
      });

      for await (const message of job) {
        if (message.type === "status") {
          logStatus(message);
        } else if (message.type === "data") {
          setOutputUrl(message.data[0][0].image.url); // Set output image URL
          setIsGenerating(false);
        }
      }
    } catch (error) {
      console.error("Error generating image", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Canvas+</h1>
      <ImageUploader onImageChange={setImage} />
      <Slider label="Width" value={width} onChange={setWidth} />
      <Slider label="Height" value={height} onChange={setHeight} />
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`w-full p-3 rounded mt-4 ${isGenerating ? "bg-gray-400" : "bg-blue-500 text-white"}`}
      >
        {isGenerating ? "Generating..." : "Generate"}
      </button>
      {isGenerating && (
        <div className="flex justify-center items-center mt-4">
          <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-2 text-gray-500">Processing image...</p>
        </div>
      )}
      <LogConsole logs={logs} isVisible={isConsoleVisible} />
      <OutputImage imageUrl={outputUrl} generationErrorMessage={generationErrorMessage} />

      <div className="bg-blue-500 rounded-md px-4 py-2 w-max mx-auto flex mt-2">
        <a href="https://www.instagram.com/owaish_3301" target="blank" className="mr-2">Created by Owaish </a>
         <Instagram />
      </div>
    </div>
  );
}

export default App;
