import {expect, test} from '@oclif/test'
import cli from 'cli-ux'

describe('login', () => {
  test
  .stub(cli, 'prompt', () => async () => 'TEST_API_KEY')
  .stdout()
  .command(['login'])
  .it('runs login', ctx => {
    expect(ctx.stdout).contain('\nYou have successfully logged in.')
  })
})
