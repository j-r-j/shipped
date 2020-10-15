import {expect, test} from '@oclif/test'

describe('logout', () => {
  test
  .stdout()
  .command(['logout'])
  .it('runs logout', ctx => {
    expect(ctx.stdout).contain('\nYou are no longer logged-in to ShipEngine.')
  })
})
