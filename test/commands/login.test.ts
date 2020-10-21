import {expect, test} from '@oclif/test'
import cli from 'cli-ux'

describe('login', () => {
  describe('login is valid', () => {
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(200))
    .stub(cli, 'prompt', () => async () => 'TEST_API_KEY')
    .stdout()
    .command(['login'])
    .it('runs login', ctx => {
      expect(ctx.stdout).contain('\nYou have successfully logged in.')
    })
  })

  describe('500 error when testing login', () => {
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(500))
    .stub(cli, 'prompt', () => async () => 'TEST_API_KEY')
    .stderr()
    .command(['login'])
    .it('runs login', ctx => {
      expect(ctx.stderr).contain('\nError: Something Went Wrong')
    })
  })

  describe('login is invalid', () => {
    test
    .nock('https://api.shipengine.com', api => api
    .get('/v1/carriers')
    .reply(401))
    .stub(cli, 'prompt', () => async () => 'TEST_API_KEY')
    .stderr()
    .command(['login'])
    .it('runs login', ctx => {
      expect(ctx.stderr).contain('\nThe API credentials provided were incorrect')
    })
  })
})
