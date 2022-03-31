# ABOUT

This is a small fast-developed React Native app that lists audiobooks from LibriVox, where you can see details about each audiobook and also listen to them.

Api: https://librivox.org/api/info
Icons: https://oblador.github.io/react-native-vector-icons/

App Images and Audios are randonly mocked so app doens't crash because LibriVox api is not storing all of them anymore.

# INSTRUCTIONS

- RUN THE APP:

1 - The first step is to clone this repository and install its dependencies:

    - Run 'gh repo clone lorran-xo/audiobook-app' or download the ZIP content here: https://github.com/lorran-xo/audiobook-app

    - On the project root, run 'yarn' to install dependencies.

2 - Follow run instructions for your device:
        a - Android:

                1 - Have an Android emulator running (quickest way to get started) for example Android Studio, or a device connected with USB debugging enabled.
                2 - npx react-native start
                3 - cd "~PROJECT_FOLDER~/audiobook-app" && npx react-native run-android

        b - iOS:
                1 - Have an iOS emulator set up on Xcode.
                2 - Open the project folder and go to ios:
                        cd "~PROJECT_FOLDER~/audiobook-app/ios"
                    run "pod install" in this folder.
                3 - Go back to the previous root folder with "cd .." and run "npx react-native start"
                4 - Open a new terminal on the same root folder and run "npx react-native run-ios"

For more instructions: https://reactnative.dev/docs/running-on-device

- RUN THE TESTS:

1- Go to the repository root and run:

    yarn run test --

- BUILD THE APP (android apk):

1- Go to audiobook-app/android and run:

        ./gradlew assemblerelease

After building, the APK will be available at:

    audiobook-app/android/app/build/outputs/apk/release
