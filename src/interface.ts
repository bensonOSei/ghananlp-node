export interface TranslationRequest {
    in: string; // Input string to be translated (max length 1000 characters)
    lang: string; // Language pair code (e.g., 'en-tw' for english to Twi translation)
}

export interface TranslationResponse {
    translatedText: string; // The translated text
}

export interface Language {
    code: string; // Language code (e.g., 'en')
    name: string; // Full language name (e.g., 'English')
}

export interface ErrorResponse {
    type: string;
    message: string;
}