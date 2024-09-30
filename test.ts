import { GhanaNLP } from './src/ghananlp'

const API_KEY = 'abc'
const ghananlp = new GhanaNLP(API_KEY)

let result = await ghananlp.translate({ in: 'wo ho te s3n?', lang: 'tw-en' })
console.log(result)
