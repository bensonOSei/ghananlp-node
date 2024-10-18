import { LanguageCode } from './src/enums';
import { GhanaNLP } from './src/ghananlp'

const API_KEY = '047338b439054b5fbe6d527ea4865dab'
const ghananlp = new GhanaNLP(API_KEY); 
(async () => {
    let result = await ghananlp.translate('wo ho te s3n?', LanguageCode.Twi, LanguageCode.English)
    console.log(result)
})()