import {expect, test} from '@oclif/test'
import * as Storage from '../../src/utils/storage'

describe('carriers', () => {
  const API_KEY = 'TEST_K3+1YnjEw97EKLS2vkH8gg5kmDyghjFv3XboqWSEAvI'
  describe('authenticated request', async () => {
    beforeEach(async function () {
      await Storage.setApiKey(API_KEY)
    })

    const carrier_id = 'se-28529731'
    const friendly_name = 'Stamps.com'
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(200, {carriers: [{carrier_id: carrier_id, friendly_name: friendly_name}]}))
    .stdout()
    .command(['carriers', 'ls'])
    .it('runs carriers ls', ctx => {
      expect(ctx.stdout).contains(`${friendly_name} ${carrier_id}`)
    })

    test
    .nock('https://api.shipengine.com', api => api
    .get(`/v1/carriers/${carrier_id}`)
    .reply(200, {carrier_id: carrier_id, friendly_name: friendly_name}))
    .stdout()
    .command(['carriers', 'find', carrier_id])
    .it('runs carriers find <command>', ctx => {
      expect(ctx.stdout).contains(friendly_name)
    })
  })

  describe('Logged Out Request', async () => {
    beforeEach(async function () {
      await Storage.clearApiKey()
    })

    test
    .stderr()
    .command(['carriers', 'ls'])
    .it('runs carriers ls', ctx => {
      expect(ctx.stderr).to.contain('\nError: You must be logged in to request your Carriers. See \'shipped login\'.\n\nSee \'shipped --help\' for more options.\n')
    })

    test
    .stderr()
    .command(['carriers', 'find', 'se-000000'])
    .it('runs carriers find <command>', ctx => {
      expect(ctx.stderr).to.contain('\nError: You must be logged in to request your Carriers. See \'shipped login\'.\n\nSee \'shipped --help\' for more options.\n')
    })
  })

  describe('Invalid Command', async () => {
    beforeEach(async function () {
      await Storage.setApiKey('FAKE_API_KEY')
    })

    test
    .stderr()
    .command(['carriers', 'lsa'])
    .it('runs carriers lsa', ctx => {
      expect(ctx.stderr).to.contain('\nshipped: lsa is not a shipped command.\n\nSee \'shipped --help\'.\n')
    })

    test
    .stderr()
    .command(['carriers', 'find'])
    .it('runs carriers find NO COMMAND', ctx => {
      expect(ctx.stderr).to.contain('\nPlease provide a carrier_id.\n\nex. \'shipped carriers find se-000000\'.\n')
    })
  })

  describe('Bad Request', async () => {
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(400))
    .stderr()
    .command(['carriers', 'ls'])
    .it('runs carriers ls', ctx => {
      expect(ctx.stderr).to.contain('\nError: Bad Request')
    })

    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers/se-000000')
    .reply(400))
    .stderr()
    .command(['carriers', 'find', 'se-000000'])
    .it('runs carriers find <command>', ctx => {
      expect(ctx.stderr).to.contain('\nError: Bad Request')
    })
  })

  describe('Invalid Token Request', async () => {
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(401))
    .stderr()
    .command(['carriers', 'ls'])
    .it('runs carriers ls', ctx => {
      expect(ctx.stderr).to.contain('\nError: Unauthorized')
    })

    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers/se-000000')
    .reply(401))
    .stderr()
    .command(['carriers', 'find', 'se-000000'])
    .it('runs carriers find <command>', ctx => {
      expect(ctx.stderr).to.contain('\nError: Unauthorized')
    })
  })

  describe('Forbidden', async () => {
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(403))
    .stderr()
    .command(['carriers', 'ls'])
    .it('runs carriers ls', ctx => {
      expect(ctx.stderr).to.contain('\nError: Forbidden')
    })

    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers/se-000000')
    .reply(403))
    .stderr()
    .command(['carriers', 'find', 'se-000000'])
    .it('runs carriers find <command>', ctx => {
      expect(ctx.stderr).to.contain('\nError: Forbidden')
    })
  })

  describe('Not Found', async () => {
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(404))
    .stderr()
    .command(['carriers', 'ls'])
    .it('runs carriers ls', ctx => {
      expect(ctx.stderr).to.contain('\nError: Not Found')
    })

    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers/se-000000')
    .reply(404))
    .stderr()
    .command(['carriers', 'find', 'se-000000'])
    .it('runs carriers find <command>', ctx => {
      expect(ctx.stderr).to.contain('\nError: Not Found')
    })
  })
})
