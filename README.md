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
> Currently there is a webapp, Android client, and iOS client, all should be linked via the main site page [MemesForMankind.com](http://www.memesformankind.com/)

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

#### Installing Cairo and image processing dependencies (for the meme creating server)
OS X

##### Make sure you have Brew/wget:

[Brew](http://brew.sh/)! (wget instructions on the page)

##### Install cairo:
follow instructions from source here
using the wget command

`wget https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh`

(if you run into any issues with freetype, this command should help by putting the correct version in the right place, per this [issue](https://github.com/Automattic/node-canvas/issues/471))

`cp /opt/X11/lib/libfreetype.6.dylib /usr/local/lib/libfreetype.6.dylib`

(if you're having other issues, you can try this command to change the pkg_config_path, so cairo is looking in the right place)

`export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig`

... if you're still having issues, check out the install instructions [here](https://github.com/Automattic/node-canvas/wiki/Installation---OSX)... and be mindful of version #s as they have a habit of becoming obsolete

#### Set Up for Android Development

- Make sure you have [Android Studio](http://developer.android.com/tools/studio/index.html) and all the suggested add-ons
- Make sure you download all the listed dependencies for the [Cordova ConnectSDK Android plugin](https://github.com/ConnectSDK/Connect-SDK-Android#dependencies)
- [Set up Cordova](https://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html)
- The client/sender-app-mobile/ directory is where the Cordova project lives
- Create a Cordova project in that directory
- You'll likely need to download all the plugins included in the repsective ios and android json files
- After you set up Android Studio, create a new Android Studio project in and point it to the directory sender-app-mobile/ directory
- In your Android Studio's build.gradle file make sure the sourceSets include the following otherwise Android Studio won't be able to build your app because it won't have the ConnectSDK otherwise

```
sourceSets {
        main {
            manifest.srcFile 'AndroidManifest.xml'
            java.srcDirs = ['src', 'CordovaLib/src']
            resources.srcDirs = ['src']
            aidl.srcDirs = ['src']
            renderscript.srcDirs = ['src']
            res.srcDirs = ['res']
            assets.srcDirs = ['assets']
        }
    }
```

- Finally, you'll need to edit one of the Android libraries to change the behavior when connecting. Out of the box the Android chromecast libraries disconnect whatever is using the Chromecast in order to instantiate their own session. We changed that in the following file so that you can actually join without kicking others off... sadly it's not included in the repo- just documented below:
In CastWebAppSession.java, lines 55-57, which we found at the following path (from within our sender-app-mobile dir) platforms/android/Connect-SDK-Android/modules/google_cast/src/com/connectsdk/service/sessions/CastWebAppSession.java

```
@Override
    public void connect(final ResponseListener<Object> listener) {
        // COMMENT THESE THREE LINES OUT!
        // if (castServiceChannel != null) {
        //     disconnectFromWebApp();
        // }

        castServiceChannel = new CastServiceChannel(launchSession.getAppId(), this);

        try {
            Cast.CastApi.setMessageReceivedCallbacks(service.getApiClient(),
                    castServiceChannel.getNamespace(),
                    castServiceChannel);

            Util.postSuccess(listener, null);
        } catch (IOException e) {
            castServiceChannel = null;

            Util.postError(listener, new ServiceCommandError(0, "Failed to create channel", null));
        }
    }
```

- Building the project in Cordova had issues, but building via the Android Studio worked just fine



#### Set Up for iOS Development

### Roadmap

View the project roadmap [here](https://waffle.io/fortunate-giraffe/memes-for-mankind)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
