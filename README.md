# ABOUT #

This is a small fast-developed react native app that lists and details audiobooks

Api: https://librivox.org/api/info

React-native: 0.67.2

# INSTRUCTIONS #

- RUN THE APP:

1 - The first step is to clone this repository and install its dependencies:

	- Run 'gh repo clone lorran-xo/audiobook-app' or download the ZIP content here: https://github.com/lorran-xo/audiobook-app

	- On the project root, run: yarn 

2 - Run instructions for Android:

        1 - Have an Android emulator running (quickest way to get started) for example Android Studio, or a device connected with USB debugging enabled.
        2 - npx react-native start
        3 - cd "/home/USER/Documents/GitHub/audiobook-app" && npx react-native run-android

For more instructions: https://reactnative.dev/docs/running-on-device

- RUN THE TESTS:

1- Go to the repository root and run:

	yarn run test --

- BUILD THE APP (android apk):

1- Go to audiobook-app/android and run:

        ./gradlew assemblerelease
   
 After building, the APK will be available at: 

	audiobook-app/android/app/build/outputs/apk/release
