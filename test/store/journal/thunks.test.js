import { collection, deleteDoc, getDocs } from "firebase/firestore/lite"
import { firebaseDB } from "../../../src/firebase/config"
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice"
import { startNewNote } from "../../../src/store/journal/thunks"
import { demoUser } from "../../fixtures/authFixtures"

describe('Journal thunks tests', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('startNewNote should create a clean note', async () => {
    getState.mockReturnValue({ auth: { uid: demoUser.uid } })
    await startNewNote()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(savingNewNote())
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      body: '',
      date: expect.any(Number),
      id: expect.any(String),
      imageUrls: expect.any(Array),
      title: '',
    }))
    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      body: '',
      title: '',
      id: expect.any(String),
      imageUrls: expect.any(Array),
      date: expect.any(Number)
    }))

    // CLEAN THE TESTING DATABASE
    const collectionRef = collection(firebaseDB, `${demoUser.uid}/journal/notes`)
    const docs = await getDocs(collectionRef)

    const deletePromises = []
    docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
    await Promise.all(deletePromises)
  })
})
