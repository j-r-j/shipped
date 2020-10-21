import {Command, flags} from '@oclif/command'
import * as chalk from 'chalk'
import * as Storage from '../utils/storage'
import cli from 'cli-ux'
import CarriersApi from '../resources/carrier/carriers-api'
import NetworkingClient from '../utils/networking-client'

export default class Carriers extends Command {
  static description = 'List and get Carrier accounts';

  static flags = {
    help: flags.help({char: 'h'}),
  };

  static aliases = ['carriers ls', 'carriers find <carrier_id>'];

  static args = [{name: 'firstArg'}, {name: 'secondArg'}];

  async run() {
    const {args} = this.parse(Carriers)
    try {
      const apiKey = await Storage.getApiKey()
      const networking = new NetworkingClient(apiKey)
      const carriersApi = new CarriersApi(networking)

      switch (args.firstArg) {
      case 'ls': {
        cli.action.start('Fetching Carriers List')
        const carriers = await carriersApi.listAll()
        cli.action.stop()
        carriers.forEach(function (value) {
          console.log(
            chalk.yellow(`${value.friendly_name} ${value.carrier_id}`),
          )
        })
        return
      }

      case 'find': {
        if (args.secondArg) {
          cli.action.start(`Fetching Carrier ${args.secondArg}`)
          const carrier = await carriersApi.find(args.secondArg)
          cli.action.stop()
          cli.log(JSON.stringify(carrier))
        } else {
          console.error(
            chalk.red('\nPlease provide a carrier_id.\n\nex. \'shipped carriers find se-000000\'.\n'),
          )
        }
        return
      }

      default: {
        console.error(
          chalk.red(`\nshipped: ${args.firstArg} is not a shipped command.\n\nSee 'shipped --help'.\n`),
        )
        return
      }
      }
    } catch (error) {
      cli.action.stop()
      console.error(chalk.red(`\n${error}`))
    }
  }
}
