import {Command, flags} from '@oclif/command'
import * as chalk from 'chalk'
import * as Storage from '../utils/storage'

export default class Logout extends Command {
  static description = 'Logout of your current session';

  static flags = {
    help: flags.help({char: 'h'}),
  };

  async run() {
    /**
     * Originally I considered throwing an error alerting the user
     * that they were already logged out.
     *
     * However, I think I like the experience of being able to type
     * logout and to not have to think about "I don't remember
     * logging out".
     *
     * Purely preference and I could be convinced either way here.
     */

    try {
      await Storage.clearApiKey()
      console.log(chalk.yellow('\nYou are no longer logged-in to ShipEngine.'))
    } catch (error) {
      console.error(chalk.red(`\n${error}`))
    }
  }
}
