# Budding 🌱

Budding is a mobile app that helps horticulturists to keep track of their plants and measure their progress as they grow.

The project was created by Stephanie Thornley, ([thorners55](https://github.com/thorners55)),
Zach Pinfold ([ZachPinfold](https://github.com/ZachPinfold)),
Joao Mak ([joao-mak](https://github.com/joao-mak)) and
Richard Bacon ([RichardBacon](https://github.com/RichardBacon)) during the [Northcoders](https://northcoders.com/) coding bootcamp.

For more information about our approach and a demonstration of the app, see our Northcoders graduation presentation: [budding | Northcoders Graduation Showcase](https://www.youtube.com/watch?v=llKXad2gF8c).

This is the repo for the frontend mobile app.

The repo for the backend api: [Budding API](https://github.com/RichardBacon/budding-api).

## Usage

The live app can run on a physical device or an emulator via [Expo Go](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and), or in a browser window via [Appetize](https://appetize.io/). See the project page on Expo for more details and links: [Budding](https://expo.io/@richardjohnbacon/projects/budding).

### Logging In and Out

Login with the default username: `robertplant`

Logout by pressing the logout button on the 'profile' screen.

### Viewing Plants

All the users plants can be viewed on the 'garden' screen.

Plants can be sorted by date added or the number of snapshots taken, in descending or ascending order.

Plants can be filtered by the plant type.

Pressing on a plant to view and edit details about that plant.

### Adding a Plant

Add a new plant by pressing the new plant button.

View a tutorial with instructions and tips on how to add a plant by pressing the tutorial button.

Choose to take a new photo of the plant or pick an existing photo to use from the gallery.

Measure how tall the plant is by marking points on the photograph. (Please see the in app tutorial for practical information on how to accomplish this).

Add information about the plant and then submit the details.

The plant will now be available in the 'garden' screen.

### Plant Snapshots

Snapshots are the way of keeping track of the plant over time.

A plant snapshot can be added by pressing the new snapshot button on an individual plants screen.

The process of adding a snapshot is the same as adding a new plant, take or choose a photograph, add markers to measure the height of the plant and then submit.

## Development

The project is built with [React Native](https://reactnative.dev/), using the [Expo](https://docs.expo.io/) framework and makes requests to a backend API using [Axios](https://axios-http.com/). Images are uploaded and stored in a [AWS S3](https://aws.amazon.com/s3/) bucket.

### Getting Started

#### Prerequisites

- node v14
- npm v7
- expo-cli v4

See the [Expo docs](https://docs.expo.io/workflow/expo-cli/) for details on how to install and use the Expo CLI.

During development the app can run on a physical iOS or Android device using the [Expo Go](https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and) app, or on an [iOS Simulator](https://docs.expo.io/workflow/ios-simulator/) (macOS only) or [Android Emulator](https://docs.expo.io/workflow/android-studio-emulator/).

#### Cloning The Repo

```bash
git clone https://github.com/RichardBacon/budding.git
```

#### Installing

```bash
cd budding
npm install
```

#### Starting The Dev Server

```bash
npm start
```

This will:

- Start the Metro Bundler (an HTTP server that compiles the JavaScript code of the app using Babel and serves it to the Expo Go app).
- Open the Expo Dev Tools in a browser window.

The Dev Tools offer a convenient way to run the app on a iOS Simulator, Android Emulator or on a physical device via the Expo Go app.

See the [Expo docs](https://docs.expo.io/workflow/expo-cli/) for more information.

## Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.io/)
- [Axios](https://axios-http.com/)

## Authors

- **Stephanie Thornley** - [thorners55](https://github.com/thorners55)
- **Zach Pinfold** - [ZachPinfold](https://github.com/ZachPinfold)
- **Joao Mak** - [joao-mak](https://github.com/joao-mak)
- **Richard Bacon** - [RichardBacon](https://github.com/RichardBacon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
