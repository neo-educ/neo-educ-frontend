import { useState } from 'react';
import { ClipboardCopy, CheckCircle } from 'lucide-react';

interface GeneratedSentencesProps {
  sentences: string[];
}

export function GeneratedSentences({ sentences }: GeneratedSentencesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const handleCopySentence = (sentence: string, index: number) => {
    navigator.clipboard.writeText(sentence);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(sentences.join('\n\n'));
    setAllCopied(true);
    setTimeout(() => {
      setAllCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-fadeIn">
      <div className="bg-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Frases geradas</h3>
          <button 
            onClick={handleCopyAll}
            className="flex items-center px-3 py-1 bg-[#FF7A00] hover:bg-orange-600 hover:cursor-pointer text-white text-sm rounded transition-colors"
          >
            {allCopied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Copiado tudo
              </>
            ) : (
              <>
                <ClipboardCopy className="h-4 w-4 mr-1" />
                Copiar tudo
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {sentences.map((sentence, index) => (
            <div 
              key={index}
              className="p-4 border border-gray-200 rounded-md hover:border-[#FF7A00] transition-colors group"
            >
              <div className="flex justify-between">
                <p className="text-gray-900">{sentence}</p>
                <button 
                  onClick={() => handleCopySentence(sentence, index)}
                  className="ml-2 text-gray-500 hover:text-[#FF7A00] hover:cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedIndex === index ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <ClipboardCopy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratedSentences;
