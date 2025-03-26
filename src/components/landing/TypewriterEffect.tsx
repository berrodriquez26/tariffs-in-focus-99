import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
const TypewriterEffect = () => {
  const {
    t,
    language
  } = useLanguage();
  const [displayText, setDisplayText] = useState('Sabemos quién opina.');

  // Define words in both languages
  const spanishWords = ['Sabemos quién opina.', 'Entendemos como impacta.', 'Lo hacemos con Inteligencia Artificial.'];
  const englishWords = ['We know who has an opinion.', 'We understand its impact.', 'We do it with Artificial Intelligence.'];

  // Choose the appropriate word list based on current language
  const words = language === 'es' ? spanishWords : englishWords;
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Reset the typewriter animation when language changes
  useEffect(() => {
    setDisplayText(words[0].substring(0, 1));
    setWordIndex(0);
    setIsDeleting(false);
    setTypingSpeed(150);
  }, [language]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setDisplayText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }
      if (!isDeleting && displayText === currentWord) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
        setTypingSpeed(200);
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, typingSpeed, words]);
  return <span className="typewriter-text inline-block font-bold text-white text-5xl">
      {displayText}
    </span>;
};
export default TypewriterEffect;