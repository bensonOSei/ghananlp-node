import { LanguageCode } from './src/enums';
import { GhanaNLP } from './src/ghananlp'

const API_KEY = 'your-subscription-key'
const ghananlp = new GhanaNLP(API_KEY); 
(async () => {
    let result = await ghananlp.textToSpeech('wo ho te s3n?', LanguageCode.Twi)
    console.log(result)
})()