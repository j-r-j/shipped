import {Command, flags} from '@oclif/command'
import * as chalk from 'chalk'
import * as Storage from '../utils/storage'

export default class Logout extends Command {
  static description = 'Logout of your current session';

  static flags = {
    help: flags.help({char: 'h'}),
  };

  async run() {
    try {
      await Storage.clearApiKey()
      console.log(chalk.yellow('\nYou are no longer logged-in to ShipEngine.'))
    } catch (error) {
      console.error(chalk.red(`\n${error}`))
    }
  }
}
