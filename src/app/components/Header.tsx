"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GlobalSetting, LanguageSwitchButton } from '@/lib/contentstack';

interface HeaderProps {
  globalSettings: GlobalSetting[];
  languageSwitchButton?: LanguageSwitchButton;
  currentLanguage?: string;
}

export default function Header({ globalSettings, languageSwitchButton, currentLanguage }: HeaderProps) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'ENGLISH');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected language when currentLanguage prop changes
  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  // Get the first global setting or use fallback
  const globalSetting = globalSettings.length > 0 ? globalSettings[0] : null;

  // Get the appropriate title based on language
  const getTitleByLanguage = () => {
    if (selectedLanguage === 'Hindi' || selectedLanguage.toLowerCase().includes('hindi')) {
      return globalSetting?.title || 'आज तक';
    }
    return globalSetting?.title || 'Aaj Tak';
  };

  // Get the appropriate subtitle based on language
  const getSubtitleByLanguage = () => {
    if (selectedLanguage === 'Hindi' || selectedLanguage.toLowerCase().includes('hindi')) {
      return globalSetting?.single_line || 'ताज़ा खबरें और अपडेट्स';
    }
    return globalSetting?.single_line || 'Latest News and Updates';
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language: string) => {
    // Map language names to URLs
    let targetUrl = '/en'; // default to English
    
    if (language.toLowerCase().includes('hindi') || language.toLowerCase().includes('hi')) {
      targetUrl = '/hi';
      setSelectedLanguage('Hindi');
    } else if (language.toLowerCase().includes('english') || language.toLowerCase().includes('en')) {
      targetUrl = '/en';
      setSelectedLanguage('ENGLISH');
    }
    
    // Navigate immediately without closing dropdown first
    navigateToLanguageUrl(targetUrl);
  };

  const handleLanguageOptionClick = (option: { single_line?: string; link?: { title: string; url: string } }) => {
    if (option.link?.url) {
      // Update selected language based on the option
      if (option.single_line?.toLowerCase().includes('hindi') || option.single_line?.toLowerCase().includes('hi')) {
        setSelectedLanguage('Hindi');
      } else if (option.single_line?.toLowerCase().includes('english') || option.single_line?.toLowerCase().includes('en')) {
        setSelectedLanguage('ENGLISH');
      }
      
      // Navigate immediately
      navigateToLanguageUrl(option.link.url);
    }
  };

  const navigateToLanguageUrl = (url: string) => {
    console.log('Navigating to language URL:', url);
    // Handle both relative and absolute URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // External URL - navigate to it
      console.log('External URL detected, navigating to:', url);
      window.location.href = url;
    } else if (url.startsWith('/')) {
      // Internal route - use Next.js router or window.location
      console.log('Internal route detected, navigating to:', url);
      window.location.href = url;
    } else {
      // Relative URL - prepend current origin
      const fullUrl = `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
      console.log('Relative URL detected, navigating to:', fullUrl);
      window.location.href = fullUrl;
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            {globalSetting?.file && (
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Image 
                  src={globalSetting.file.url} 
                  alt={globalSetting.file.filename}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">
                {getTitleByLanguage()}
              </h1>
              <p className="text-blue-100 text-sm">
                {getSubtitleByLanguage()}
              </p>
            </div>
          </div>

          {/* Navigation and Live Status from CMS */}
          <div className="flex items-center space-x-8">
            {/* Navigation from CMS live field */}
            {globalSetting?.live && (
              <nav className="hidden md:flex items-center space-x-4">
                <span className="text-white text-sm">
                  {globalSetting.live}
                </span>
              </nav>
            )}
            
            {/* Live Status */}
            {globalSetting?.group?.boolean && (
              <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                🔴 LIVE
              </span>
            )}

            {/* Language Switch Button */}
            {languageSwitchButton && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">
                    {languageSwitchButton.title || 'Language'}
                  </span>
                  <span className="text-xs">({selectedLanguage})</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      {languageSwitchButton.dropdown?.map((language, index) => (
                        <button
                          key={index}
                          onClick={() => handleLanguageChange(language)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                            selectedLanguage === language ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                    
                    {/* Language Options from choose_language blocks */}
                    {languageSwitchButton.choose_language && languageSwitchButton.choose_language.length > 0 && (
                      <div className="border-t border-gray-200 pt-2">
                        <div className="px-4 py-2 text-xs text-gray-500 font-medium">
                          Language Options:
                        </div>
                        {languageSwitchButton.choose_language.map((option, index) => (
                          <div key={index} className="px-4 py-2">
                            {option.single_line && (
                              <div className="text-sm text-gray-700 mb-1">
                                {option.single_line}
                              </div>
                            )}
                            {option.link && (
                              <button
                                onClick={() => handleLanguageOptionClick(option)}
                                className="text-xs text-blue-600 hover:text-blue-800 block w-full text-left"
                              >
                                {option.link.title}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden mt-4">
          <button className="text-white hover:text-blue-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 