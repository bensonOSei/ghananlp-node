# ghananlp-node

Simple Typescript wrapper for the [GhanaNLP Translation API](https://ghananlp.org/). Allows you to effortlessly translate text between supported languages and retrieve a list of available language pairs.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Translate Text](#translate-text)
  - [Get Supported Languages](#get-supported-languages)
- [Error Handling](#error-handling)
- [API Reference](#api-reference)
- [Roadmap/Coming Soon](#coming-soon)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package via npm:

```bash
npm install @paakways/ghananlp-node
```

If you are using TypeScript, make sure to have `axios` types as a development dependency:

```bash
npm install --save-dev @types/axios
```

## Getting Started

1. **Import the library into your Project**

    ```typescript
    import {GhanaNLP} from '@paakways/ghananlp-node';
    ```

2. **Initialize the library with your API Key and version**

    To use the library, you will need to get an API key from the [GhanaNLP APIs website](https://translation.ghananlp.org/apis).

    ```typescript
    const api = new GhanaNLP('YOUR_API_KEY');
    ```

## Usage

### Translate Text

To translate text from one language to another, use the `translate` method. You need to specify the input text and the language code of the language you want to translate to and from. You can use the `LanguageCode` enum to get the language codes or use the language codes directly (e.g. `LanguageCode.Twi` for Twi, or `'tw'` for Twi).

```typescript
    const text = 'Hello World';
    const language = LanguageCode.Twi;
    try {
        const response = await api.translate(text, language)
        console.log('Translated text:', translatedText);
    }
    catch(error) {
        console.error('Translation error:', error.message);
    }
```

### Get Supported Languages

You can retrieve a list of all supported languages with their language codes:

```typescript
    try {
        const languages = await api.getLanguages()
        console.log('Supported languages:', languages);
    }
    catch(error) {
        console.error('Error fetching languages:', error.message);
    }
```

### Convert Text to Speech

To convert text to speech, use the `textToSpeech` method. You need to specify the input text and the language code of the text to be converted to speech. You can use the `LanguageCode` enum to get the language codes or use the language codes directly (e.g. `LanguageCode.Twi` for Twi, or `'tw'` for Twi).

```typescript
    const text = 'Hello World';
    const language = LanguageCode.Twi;

    try {
        const response = await api.textToSpeech(text, language)
        console.log('Audio data:', response); // Audio data is returned as a buffer which you can save to a file or stream to a file
    }
    catch(error) {
        console.error('Text to speech error:', error.message);
    }
```

## Error Handling

The library provides error handling to help diagnose issues with the API requests. If an error occurs, it will throw a message detailing the type and description of the error.

Example of catching an error:

```typescript
    try {
        const response = await api.translate({ in: 'Hello', lang: 'invalid-code' })
    }
    catch(error) {
        console.error('Error:', error.message); // Outputs detailed error message
    }
```

## API Reference

### `translate(text: string, language: LanguageCode): Promise<TranslationResponse>`

Translates the given input text from one language to another.

- **Parameters**:
  - `text`: The input text to be translated (max 1000 characters).
  - `language`: Language pair code in the format `from-to` (e.g., `en-tw`).

- **Returns**: A promise that resolves to the translated text.

### `getLanguages(): Promise<Language[]>`

Retrieves the list of all supported languages.

- **Returns**: A promise that resolves to an array of language objects, each containing:
  - `code`: The language code (e.g., `en` for English).
  - `name`: The full language name (e.g., `English`).

### `textToSpeech(text: string, language: LanguageCode): Promise<Buffer>`

Converts the given input text to speech.

- **Parameters**:
  - `text`: The input text to be converted to speech (max 1000 characters).
  - `language`: Language code of the text to be converted to speech.

- **Returns**: A promise that resolves to the audio data as a buffer.

## Coming Soon

- TTS/STT API integration

## Contributing

Contributions are welcome! If you find any bugs or have any feature requests, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to the branch.
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
