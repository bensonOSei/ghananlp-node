import axios, { AxiosInstance } from 'axios';
import { TranslationRequest, TranslationResponse, Language, ErrorResponse } from './interface'
import { GhanaNLPEndpoints, LanguageCode } from './enums';

export class GhanaNLP {
    private apiKey: string;
    private baseURL: string = 'https://translation-api.ghananlp.org';
    private headers: Record<string, string>;
    private MAX_TEXT_LENGTH: number = 1000;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('An API key is required');
        }
        this.apiKey = apiKey;
        this.headers = {
            'Ocp-Apim-Subscription-Key': this.apiKey,
            'Content-Type': 'application/json',
        };
    }

    private async request<T>(
        endpoint: GhanaNLPEndpoints,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        data?: any
      ): Promise<T> {
        const response = await axios<T>({
          method,
          url: `${this.baseURL}${endpoint}`,
          headers: this.headers,
          data,
        });
        return response.data as T;
      }
    
    /**
     * Translates the given input text.
     * @param {string} text - The text to be translated.
     * @param {LanguageCode} from - The source language code.
     * @param {LanguageCode} to - The target language code.
     * @returns {Promise<TranslationResponse>} The translated text.
     */
    async translate(text: string, from: LanguageCode, to: LanguageCode): Promise<TranslationResponse> {
        const translationRequest: TranslationRequest = {
            in: text,
            lang: `${from}-${to}`
        }

        try {
            if (text.length > this.MAX_TEXT_LENGTH) {
                throw new Error('Input text length exceeds 1000 characters');
            }
            const response = await this.request<TranslationResponse>(GhanaNLPEndpoints.TRANSLATE, 'POST', translationRequest);
            return response;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Retrieves a list of supported languages.
     * @returns {Promise<Language[]>} The list of language codes with their corresponding language names.
     */
    async getLanguages(): Promise<Language[]> {
        try {
            const response = await this.request<Language[]>(GhanaNLPEndpoints.LIST_LANGUAGES, 'GET');
            return response;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Handles API errors and provides appropriate messages.
     * @param {Object} error - Axios error object.
     */
    private handleError(error: any): never {
        if (error.response) {
            const errResponse: ErrorResponse = error.response.data;
            console.error('Error:', errResponse.message || 'An error occurred');
            throw new Error(errResponse.message || 'An error occurred');
        } else if (error.request) {
            console.error('No response received from the API');
            throw new Error('No response received from the API');
        } else {
            console.error('Error:', error.message);
            throw new Error(error.message);
        }
    }
}

