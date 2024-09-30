import axios, { AxiosInstance } from 'axios';

export class GhanaNLP {
    private apiKey: string;
    private client: AxiosInstance;
    private baseURL: string = 'https://translation-api.ghananlp.org/v1';

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('An API key is required');
        }
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Ocp-Apim-Subscription-Key': this.apiKey,
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Translates the given input text.
     * @param {TranslationRequest} request - Object containing the text to be translated and language pair code.
     * @returns {Promise<TranslationResponse>} The translated text.
     */
    async translate(request: TranslationRequest): Promise<TranslationResponse> {
        if (request.in.length > 1000) {
            throw new Error('Input text length exceeds 1000 characters');
        }

        try {
            const response = await this.client.post<TranslationResponse>('/translate', request);

            return response.data;
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
            const response = await this.client.get<Language[]>('/languages');
            return response.data;
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

