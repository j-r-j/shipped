<img width="990" alt="Group 10" src="https://user-images.githubusercontent.com/6531087/96325434-4426ee80-0fed-11eb-8a29-dd3547e7e6b8.png">

shipped
=======

A Command Line Interface (CLI) for the ShipEngine API

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/j-r-j/shipped.svg?style=svg)](https://app.circleci.com/pipelines/github/j-r-j/shipped)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g shipped
$ shipped COMMAND
running command...
$ shipped (-v|--version|version)
shipped/0.1.0 darwin-x64 node-v12.19.0
$ shipped --help [COMMAND]
USAGE
  $ shipped COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`shipped carriers [FIRSTARG] [SECONDARG]`](#shipped-carriers-firstarg-secondarg)
* [`shipped help [COMMAND]`](#shipped-help-command)
* [`shipped login`](#shipped-login)
* [`shipped logout`](#shipped-logout)

## `shipped carriers [FIRSTARG] [SECONDARG]`

List and get Carrier accounts

```
USAGE
  $ shipped carriers [FIRSTARG] [SECONDARG]

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ shipped carriers ls
  $ shipped carriers find <carrier_id>
```

_See code: [src/commands/carriers.ts](https://github.com/j-r-j/shipped/blob/v0.1.0/src/commands/carriers.ts)_

## `shipped help [COMMAND]`

display help for shipped

```
USAGE
  $ shipped help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `shipped login`

Login using you API credential

```
USAGE
  $ shipped login

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/login.ts](https://github.com/j-r-j/shipped/blob/v0.1.0/src/commands/login.ts)_

## `shipped logout`

Logout of your current session

```
USAGE
  $ shipped logout

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/logout.ts](https://github.com/j-r-j/shipped/blob/v0.1.0/src/commands/logout.ts)_
<!-- commandsstop -->
