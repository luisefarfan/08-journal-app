import { authSlice, checkingCredentials, login, logout } from "../../src/store/auth/authSlice"
import { AUTHENTICATED_STATE, CHECKING_STATE, NOT_AUTHENTICATED_STATE } from "../../src/store/auth/constants"
import { authenticatedState, demoUser, initialState } from "../fixtures/authFixtures"

describe('AuthSlice tests', () => {
  it('should return the initial state and have the name auth', () => {
    const { name } = authSlice
    expect(name).toBe('auth')

    const state = authSlice.reducer(initialState, {})
    expect(state).toEqual(initialState)
  })

  it('should log in', () => {
    const state = authSlice.reducer(initialState, login(demoUser))

    expect(state).toEqual({
      status: AUTHENTICATED_STATE,
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    })
  })

  it('should log out (without arguments)', () => {
    const state = authSlice.reducer(authenticatedState, logout())

    expect(state).toEqual({
      status: NOT_AUTHENTICATED_STATE,
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null
    })
  })

  it('should log out (with arguments)', () => {
    const errorMessage = 'An error happened'
    const state = authSlice.reducer(authenticatedState, logout(errorMessage))

    expect(state).toEqual({
      status: NOT_AUTHENTICATED_STATE,
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage
    })
  })

  it('should change the state to checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials())

    expect(state.status).toBe(CHECKING_STATE)
  })
})
