# Artruistic Games Website

<img src="static/images/logo.png" alt="Artruistic Games" style="width: 200px;"/>

## Description

This repository tracks the development and progress of the Artruistic Games website.

## Development

The code base will assume that the developer is working on a Linux-based environment.
The main impact of this assumption are the scripts contained in the `/bin` directory
which are written as bash scripts. The two scripts are as follows:

1. `run` - Starts up a simple server that should be started up everytime we are actively
developing the site. We need to have this started in order to gain access to EJS
capabilities.
2. `watch` - Starts up a `compass` daemon that watches for changes in SASS files
and compiles in to CSS accordingly.

## Maintenance

_We should come up with a maintenance plan so that non-web developers will also
be able to easily update the site. Most likely, this will take the form of a
back-end served JSON file containing localizations and content strings that will
be used to programmatically insert into the DOM._

## Deployment

The current configuration used for deployment is through a free hosting service.
In order to upload files to this remote hosting service, the recommended method
is through FTP. As such, deployment of this site can be achieved from third-party
software such as FileZilla. We should look into writing a script that will deploy
from the command line.

#### FTP Client Configuration

- __FTP Host__: cpanel.freehosting.com
- __Username__: artruist
- __Password__: m9b1vL9Y8y
- __Remote directory__: public_html
