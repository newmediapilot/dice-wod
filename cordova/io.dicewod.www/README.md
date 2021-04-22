#Prerequisites
####Download Gradle
https://gradle.org/
- Install content at the root of your drive C:/Gradle/...
- Add environment PATH variable of GRADLE_HOME pointing to above install
####Download Android Studio and Install Android latest SDK
`C:\Users\marcinzajkowski\AppData\Local\Android\Sdk\platforms\android-30`
- Add environment path of ANDROID_HOME pointing to above installation
- Add environment path of GRADLE_HOME pointing to above installation
####Download Java SDK
`C:\Program Files\Android\Android Studio\jre\`
- Add environment var of ANDROID_HOME pointing to above install
# Build steps
Derived from:
https://codesundar.com/publish-cordova-apps-to-playstore/
### Open CMD window
## First time build
```
cd C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www

cordova build --release android

keytool -genkey -v -keystore dicewod.keystore -alias io.dicewod.www -keyalg RSA -keysize 2048 -validity 10000

rename C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk dicewod.apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\dicewod.keystore C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod.apk io.dicewod.www

C:\Users\marcinzajkowski\AppData\Local\Android\Sdk\build-tools\30.0.3\zipalign.exe -v 4 C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod.apk C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod-final.apk
```
## Update build
```
cd C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www

del /f C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod.apk
del /f C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod.apk

cordova build --release android

rename C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk dicewod.apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\dicewod.keystore C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod.apk dicewod

C:\Users\marcinzajkowski\AppData\Local\Android\Sdk\build-tools\30.0.3\zipalign.exe -v 4 C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod.apk C:\Users\marcinzajkowski\Desktop\desktop\newmediapilot\dice-wod\cordova\io.dicewod.www\platforms\android\app\build\outputs\apk\release\dicewod-final.apk
```
