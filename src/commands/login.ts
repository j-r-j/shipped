import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as chalk from 'chalk'
import * as Storage from '../utils/storage'

export default class Login extends Command {
  static description = 'Login using you API credential';

  static flags = {
    help: flags.help({char: 'h'}),
  };

  async run() {
    const apiKey = (await cli.prompt('\nPlease enter your ShipEngine API key', {
      type: 'hide',
    })) as string

    /**
     * Would like to hit a /ping endpoint or an auth enpoint
     * to verify that the user is using a valid api key.
     *
     * For now I am setting the api key and "it just works".
     * This will leave the user vulnerable to human error.
     *
     * In the event we develop a /ping endpoint I could have this
     * Command layer call ping using the api key and start a console
     * action for "Logging-In"
     *
     * In the event of a 200 I will sign the user in.
     * In the event of any other error I will tell the user
     * 403 - The key you input was invalid. Please try again.
     * Any other error - Something Went Wrong. Please try again.
     *
     * cli.action.start('Logging-In')
     */

    try {
      await Storage.setApiKey(apiKey)
      console.log(chalk.yellow('\nYou have successfully logged in.'))
    } catch (error) {
      console.error(chalk.red('\nSorry, something went wrong. Please try again'))
    }
  }
}
