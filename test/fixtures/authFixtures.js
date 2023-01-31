import { AUTHENTICATED_STATE, CHECKING_STATE, NOT_AUTHENTICATED_STATE } from "../../src/store/auth/constants";

export const initialState = {
  status: CHECKING_STATE,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authenticatedState = {
  status: AUTHENTICATED_STATE,
  uid: '123456',
  email: 'test@email.com',
  displayName: 'Test',
  photoURL: 'https://test.jpg',
  errorMessage: null
}

export const notAuthenticatedState = {
  status: NOT_AUTHENTICATED_STATE,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const demoUser = {
  uid: '123456',
  email: 'test@email.com',
  displayName: 'Test',
  photoURL: 'https://test.jpg'
}
