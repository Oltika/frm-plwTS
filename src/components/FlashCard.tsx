
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { WordPair } from "@/data/spanishWords";
import { RotateCw } from "lucide-react";

interface FlashCardProps {
  word: WordPair;
}

export function FlashCard({ word }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="perspective-1000 w-full max-w-md cursor-pointer mx-auto"
      data-testid="card"
      onClick={handleCardClick}
    >
      <div 
        className={`relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        data-testid="card-inner"
      >
        {/* Front side - Spanish */}
        <Card className="absolute w-full h-full flex flex-col items-center justify-center p-6 backface-hidden bg-white border-2 border-red-500/20 shadow-md">
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium px-2 py-1 bg-red-100 text-red-800 rounded-full mb-4">
              {word.partOfSpeech}
            </div>
            <h2 className="text-5xl font-bold text-red-600 mb-2" data-testid="card-front">{word.spanish}</h2>
            <div className="flex items-center gap-1 mt-8 text-gray-400 text-sm">
              <RotateCw className="h-4 w-4" />
              <span>Tap to flip</span>
            </div>
          </div>
        </Card>

        {/* Back side - English */}
        <Card className="absolute w-full h-full flex flex-col items-center justify-center p-6 backface-hidden bg-white border-2 border-blue-500/20 rotate-y-180 shadow-md">
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full mb-4">
              {word.partOfSpeech}
            </div>
            <h2 className="text-5xl font-bold text-blue-600 mb-2" data-testid="card-back">{word.english}</h2>
            <div className="flex items-center gap-1 mt-8 text-gray-400 text-sm">
              <RotateCw className="h-4 w-4" />
              <span>Tap to flip back</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
