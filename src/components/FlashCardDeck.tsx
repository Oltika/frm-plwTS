
import { useMemo, useState } from "react";
import { FlashCard } from "@/components/FlashCard";
import { WordPair, spanishWords } from "@/data/spanishWords";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Repeat, Shuffle } from "lucide-react";

export function FlashCardDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = spanishWords[currentIndex];
  const totalCards = spanishWords.length;

  // Decide once per mount whether to hide the Random button (33% chance)
  const hideRandomButton = useMemo(() => Math.random() < 0.33, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalCards - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalCards - 1 ? 0 : prevIndex + 1
    );
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * totalCards);
    setCurrentIndex(randomIndex);
  };

  // Calculate progress percentage
  const progressPercentage = ((currentIndex + 1) / totalCards) * 100;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="w-full card-float">
        <FlashCard word={currentWord} />
      </div>
      
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center gap-1"
            data-testid="prev-btn"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="px-4 py-1 bg-white rounded-full shadow-sm text-sm font-medium text-gray-700" data-testid="counter">
            {currentIndex + 1} / {totalCards}
          </div>
          
          <Button 
            onClick={handleNext}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700"
            data-testid="next-btn"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {!hideRandomButton && (
          <Button
            variant="outline"
            onClick={handleRandom}
            className="flex items-center justify-center gap-2 w-full"
            data-testid="random-btn"
          >
            <Shuffle className="h-4 w-4" />
            Random Card
          </Button>
        )}
      </div>
    </div>
  );
}
