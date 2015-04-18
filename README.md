Circle CI [![Circle CI](https://circleci.com/gh/fortunate-giraffe/memes-for-mankind/tree/master.svg?style=svg)](https://circleci.com/gh/fortunate-giraffe/memes-for-mankind/tree/master) Waffle.io  [![Stories in Ready](https://badge.waffle.io/fortunate-giraffe/memes-for-mankind.svg?label=ready&title=Ready)](http://waffle.io/fortunate-giraffe/memes-for-mankind)
=========

# MemesForMankind

> Grab a Chromecast, grab some friends, and have a great time making awkward/inappropriate/terrible memes!

## Team

  - __Product Owner__: rmagee88
  - __Scrum Master__: AJKitson
  - __Development Team Members__: i-made-that, RVreeland

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Use this repo to develop and extend the original game, or use the links below to play the current version.
> [Link to Chromecast app], [Link to webapp]

## Requirements

- Node 0.10.x
- Google Chrome
- Google Chromecast

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

####Installing Cairo and image processing dependencies (for the meme creating server)
OS X
#####Install cairo:
follow instructions from source here
using the wget command

`wget https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh`

(if you run into any issues with freetype, this command should help by putting the correct version in the right place, per this [issue](https://github.com/Automattic/node-canvas/issues/471))

`cp /opt/X11/lib/libfreetype.6.dylib /usr/local/lib/libfreetype.6.dylib`

#####Install node-canvas:
npm install canvas

#####Install memecanvas:
npm install memecanvas

### Roadmap

View the project roadmap [here](https://waffle.io/fortunate-giraffe/memes-for-mankind)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
