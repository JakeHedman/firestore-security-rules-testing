const { apps, initializeTestApp, assertFails } = require('@firebase/testing')

const user = initializeTestApp({
  projectId: `testing-${+new Date()}`,
  auth: { uid: 'userid' },
}).firestore()

afterAll(() => {
  // Teardown
  return Promise.all(apps().map(app => app.delete()))
})

describe('User', () => {
  it('Should be able to write own user', async () => {
    await user
      .collection('users')
      .doc('userid')
      .set({ name: 'jake' })
  })

  it('Should not be able to write other users', async () => {
    await assertFails(
      user
        .collection('users')
        .doc('otheruser')
        .set({ name: 'jake' })
    )
  })
})
