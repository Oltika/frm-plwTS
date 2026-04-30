import { FlashCardDeck } from "@/components/FlashCardDeck";
import { Header } from "@/components/Header";
import { maybeThrowRandomError } from "@/lib/randomError";
const Index = () => {
  // Always active: ~33% chance of a random error
  maybeThrowRandomError(0.33);
  
  return <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Essential Spanish Words</h1>
          <p className="text-gray-600 max-w-lg mx-auto">Learn Spanish vocabulary with interactive flashcards. Click on a card to reveal its English translation.</p>
        </header>
        
        <main className="my-8">
          <FlashCardDeck />
        </main>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <div className="bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto border border-gray-100">
            <h3 className="font-medium text-gray-700 mb-2">How to use:</h3>
            <ul className="space-y-1 text-left pl-4 list-disc">
              <li>Click or tap on a card to flip it</li>
              <li>Use the navigation buttons to move between cards</li>
              <li>Try the random button for spaced repetition</li>
              <li>Practice regularly for better retention</li>
            </ul>
          </div>
          
          <p className="mt-6 text-xs text-gray-400">
            Built with ❤️ for Spanish language learners
          </p>
        </footer>
      </div>
    </div>;
};
export default Index;