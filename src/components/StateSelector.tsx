
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { getAllStateNames } from '@/services/tariffData';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
}

const StateSelector = ({ selectedState, onStateChange }: StateSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [states, setStates] = useState<string[]>([]);
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Text translations for the component
  const placeholderText = language === 'en' ? 'Select a state' : 'Selecciona un estado';
  const searchPlaceholder = language === 'en' ? 'Search state...' : 'Buscar estado...';
  const noResultsText = language === 'en' ? 'No results found' : 'No se encontraron resultados';

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateNames = await getAllStateNames();
        setStates(stateNames);
        setFilteredStates(stateNames);
      } catch (error) {
        console.error("Error fetching state names:", error);
      }
    };
    
    fetchStates();
  }, []);

  useEffect(() => {
    setFilteredStates(
      states.filter(state => 
        state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, states]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectState = (state: string) => {
    onStateChange(state);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900">{selectedState || placeholderText}</span>
        <span className="ml-2 text-gray-500">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in-up">
          <div className="flex items-center px-3 py-2 border-b">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full p-1 focus:outline-none text-sm"
              autoFocus
            />
          </div>
          <ul 
            className="py-1 overflow-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
            role="listbox"
          >
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => (
                <li
                  key={state}
                  onClick={() => handleSelectState(state)}
                  className={cn(
                    "px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors",
                    selectedState === state ? "bg-gray-50 font-medium" : ""
                  )}
                  role="option"
                  aria-selected={selectedState === state}
                >
                  {state}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">{noResultsText}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StateSelector;
