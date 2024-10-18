import { GhanaNLP } from './src/ghananlp'

const API_KEY = '047338b439054b5fbe6d527ea4865dab'
const ghananlp = new GhanaNLP(API_KEY);

(async () => {
    const result = await ghananlp.getLanguages()
    console.log(result)
})()
