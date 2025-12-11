import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, X } from "lucide-react";
import { languages } from "@/data/lebanese-locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Extended list of languages for "Other" selection
const otherLanguages = [
  "Afrikaans", "Albanian", "Amharic", "Bengali", "Bulgarian", "Cantonese",
  "Catalan", "Croatian", "Czech", "Danish", "Dutch", "Estonian", "Farsi",
  "Finnish", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian", "Icelandic",
  "Indonesian", "Japanese", "Javanese", "Kannada", "Kazakh", "Korean", "Kurdish",
  "Latin", "Latvian", "Lithuanian", "Malay", "Malayalam", "Mandarin", "Marathi",
  "Nepali", "Norwegian", "Pashto", "Polish", "Punjabi", "Romanian", "Serbian",
  "Sinhala", "Slovak", "Slovenian", "Somali", "Swahili", "Swedish", "Tagalog",
  "Tamil", "Telugu", "Thai", "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Welsh", "Yoruba", "Zulu"
];

interface LanguagesStepProps {
  data: {
    languages: string[];
    languageLevels?: Record<string, number>;
    otherLanguages?: string[];
  };
  onChange: (field: string, value: string[] | Record<string, number> | string) => void;
}

const LanguagesStep = ({ data, onChange }: LanguagesStepProps) => {
  const [showOtherDropdown, setShowOtherDropdown] = useState(false);
  
  const languageLevels = data.languageLevels || {};
  const selectedOtherLanguages = data.otherLanguages || [];

  // Filter out "Other" from main languages list
  const mainLanguages = languages.filter(l => l !== "Other");

  const handleLanguageToggle = (language: string) => {
    const currentLanguages = data.languages || [];
    if (currentLanguages.includes(language)) {
      const newLanguages = currentLanguages.filter((l) => l !== language);
      const newLevels = { ...languageLevels };
      delete newLevels[language];
      onChange("languages", newLanguages);
      onChange("languageLevels", newLevels);
    } else {
      const newLanguages = [...currentLanguages, language];
      const newLevels = { ...languageLevels, [language]: 3 };
      onChange("languages", newLanguages);
      onChange("languageLevels", newLevels);
    }
  };

  const handleLevelChange = (language: string, level: number) => {
    const newLevels = { ...languageLevels, [language]: level };
    onChange("languageLevels", newLevels);
  };

  const handleOtherToggle = () => {
    setShowOtherDropdown(!showOtherDropdown);
  };

  const handleAddOtherLanguage = (language: string) => {
    if (selectedOtherLanguages.length < 3 && !selectedOtherLanguages.includes(language)) {
      const newOtherLangs = [...selectedOtherLanguages, language];
      const newLevels = { ...languageLevels, [language]: 3 };
      onChange("otherLanguages", newOtherLangs);
      onChange("languageLevels", newLevels);
    }
  };

  const handleRemoveOtherLanguage = (language: string) => {
    const newOtherLangs = selectedOtherLanguages.filter(l => l !== language);
    const newLevels = { ...languageLevels };
    delete newLevels[language];
    onChange("otherLanguages", newOtherLangs);
    onChange("languageLevels", newLevels);
  };

  // Get available languages for dropdown (not already selected)
  const availableOtherLanguages = otherLanguages.filter(
    l => !selectedOtherLanguages.includes(l)
  );

  const StarRating = ({ language, level }: { language: string; level: number }) => (
    <div className="flex items-center gap-0.5 mt-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLevelChange(language, star);
          }}
          className="p-0"
        >
          <Star
            className={`w-4 h-4 transition-colors ${
              star <= level
                ? "fill-primary text-primary"
                : "fill-none text-muted-foreground"
            }`}
          />
        </button>
      ))}
      <span className="text-[10px] text-muted-foreground ml-1.5">
        {level === 1 && "Basic"}
        {level === 2 && "Elementary"}
        {level === 3 && "Intermediate"}
        {level === 4 && "Advanced"}
        {level === 5 && "Fluent"}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Languages
        </h2>
        <p className="text-muted-foreground">Select all languages you speak and rate your fluency</p>
      </div>

      <div className="space-y-2">
        <Label>Languages Spoken *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {mainLanguages.map((language) => {
            const isSelected = data.languages?.includes(language);
            
            return (
              <div
                key={language}
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleLanguageToggle(language)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={language}
                    checked={isSelected}
                    onCheckedChange={() => handleLanguageToggle(language)}
                  />
                  <label
                    htmlFor={language}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {language}
                  </label>
                </div>
                
                {isSelected && (
                  <StarRating 
                    language={language} 
                    level={languageLevels[language] || 3} 
                  />
                )}
              </div>
            );
          })}

          {/* Other Option */}
          <div
            className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${
              showOtherDropdown || selectedOtherLanguages.length > 0
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
            onClick={handleOtherToggle}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                id="other-lang"
                checked={showOtherDropdown || selectedOtherLanguages.length > 0}
                onCheckedChange={handleOtherToggle}
              />
              <label
                htmlFor="other-lang"
                className="text-sm font-medium cursor-pointer flex-1"
              >
                Other
              </label>
            </div>

            {(showOtherDropdown || selectedOtherLanguages.length > 0) && (
              <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                {selectedOtherLanguages.length < 3 && (
                  <Select onValueChange={handleAddOtherLanguage}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder={`Add language (${3 - selectedOtherLanguages.length} left)`} />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {availableOtherLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Other Languages with Star Ratings */}
        {selectedOtherLanguages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {selectedOtherLanguages.map((language) => (
              <div
                key={language}
                className="flex flex-col p-3 rounded-lg border border-primary bg-primary/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{language}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOtherLanguage(language)}
                    className="p-0.5 hover:bg-destructive/20 rounded"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
                <StarRating 
                  language={language} 
                  level={languageLevels[language] || 3} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagesStep;
