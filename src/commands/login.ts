import {Command, flags} from '@oclif/command'
import * as chalk from 'chalk'
import * as Storage from '../utils/storage'
import cli from 'cli-ux'
import CarriersApi from '../resources/carrier/carriers-api'
import NetworkingClient from '../utils/networking-client'

export default class Login extends Command {
  static description = 'Login using you API credential';

  static flags = {
    help: flags.help({char: 'h'}),
  };

  async run() {
    const apiKey = (await cli.prompt('\nPlease enter your ShipEngine API key', {
      type: 'hide',
    })) as string

    try {
      await Storage.setApiKey(apiKey)
    } catch (error) {
      console.error(chalk.red('\nSorry, something went wrong. Please try again'))
      return
    }

    /**
     * Would like to hit an auth endpoint or an auth enpoint
     * to verify that the user is using a valid api key.
     *
     * Originally I was setting an api key and "it just works".
     * This will leave the user vulnerable to human error.
     *
     * In the event we develop an auth endpoint I could have this
     * Command layer call ping using the api key and start a console
     * action for "Logging-In"
     *
     * In the event of a 200 I will sign the user in.
     * In the event of any other error I will tell the user
     * 401 - The key you input was invalid.
     *
     * Because there is not an auth endpoint I am going to auth with Carriers
     */

    //
    const networking = new NetworkingClient(apiKey)
    const carriersApi = new CarriersApi(networking)

    cli.action.start('Logging you into shipped')
    try {
      await carriersApi.listAll()
      cli.action.stop()
      console.log(chalk.yellow('\nYou have successfully logged in.'))
    } catch (error) {
      cli.action.stop()
      await Storage.clearApiKey()
      switch (error.response?.status) {
      case 401:
        console.error(chalk.red('\nThe API credentials provided were incorrect.\n\nPlease go to', chalk.underline.white('https://app.shipengine.com/'), 'and verify your credentials.'))
        break

      default:
        console.error(chalk.red(`\n${error}`))
        break
      }
    }
  }
}
