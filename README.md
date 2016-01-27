# cordova-react-sample

### Requirements
* Cordova (>=5.4.x)
* Node.js (>=4.x.x)
* React.js (v0.14.x)
* react-router
* ES6
  * Babel(v5.xを仕様)
* 開発ツール
  * Gulp
  * Webpack
  * Sass
etc...

### インストール

#### Cordovaのインストール

詳細は<http://www.buildinsider.net/mobile/bookhtml5hybrid/0401>を参考

1. Node(=4.x)をインストール
2. cordovaのコマンドラインツールをインストールする
```
$ npm install cordova -g
$ cordova -v
5.4.1
```

#### Androidの環境構築

> https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html

1) SDKをダウンロード
http://developer.android.com/sdk/installing/index.html
今回はSTAND-ALONE SDKを選択。  
2) 適当な場所に解凍し、PATHを通す。  
例：.bash_profileなどに以下を追記
```
export PATH=$PATH:/path/to/android-sdk-macosx/tools/
export PATH=$PATH:/path/to/android-sdk-macosx/platforms/
```
3)  android-22(Android API 22)をインストール（androidのビルドが通らなかった場合のみ）
```
$ android
```
で、Android SDK Managerを起動し、「Android 5.1.1(API 22)」を選択しインストール。  
4) `cordova build`が通ればOK

#### Android Virtual Device(エミュレータ)のインストール
1) AVDの作成
```
$ android
```
で、Android SDK Managerを起動し、メニューからTooles、Managed ADVsを選択
Nexus 5など適当な端末を選択し、AVDを作成

2) エミュレータの起動
```
$ cordova emulate android
```

### iOSの環境構築

> https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html

1) Xcodeをインストール  
2) Deployツールをインストール
```
$ npm install ios-sim -g
$ npm install ios-deploy -g
```
3) ビルドチェック
```
$ cordova run ios --target="iPhone-6"
```
などでiOSシミュレータが起動すること

## インストール
    $ git clone git@github.com:mildsummer/cordova-react-sample.git
    $ npm install

## 使い方
開発時ビルド

    $ npm start
ブラウザで`localhost:3000`を開く

本番用のビルドは

    $ npm run prod
iOSだけの場合

    $ npm run prod:ios
Androidだけの場合

    $ npm run prod:android

その後、エミュレータを起動するときは

    $ cd build
    $ cordova emulate ios または android