// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate'

// Configuration to use .env.test in testing
require('dotenv').config({
  path: '.env.test'
})

// Configure jest to return all the environment variables, but from process.env, not import.meta
jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env })
}))
