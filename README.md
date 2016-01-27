# NHKforSchool Frontend App

### Requirements
* Cordova (>=5.4.x)
* Node.js (>=4.x.x)
* React.js (v0.14.x)
* react-router
* ES6
  * Babel(v5.xを仕様)
* Velocity.js
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

### ファイル構成
```
.
├── build  (ビルド後のファイル）
│   ├── hooks
│   ├── platforms
│   ├── plugins
│   ├── www
│   │   ├── javascripts
│   │   ├── stylesheets
│   │   └── index.html
│   └── config.xml
├── source
│   ├── platforms (プラットフォーム毎の設定ファイル)
│   ├── plugins (cordovaに追加するプラグイン）
│   ├── hooks
│   │   └── README.md
│   ├── www （リソースファイル）
│   │   ├── javascripts
│   │   │   ├── components（ヘッダー、タブ、リストなどのパーツ）
│   │   │   ├── containers（各ページ）
│   │   │   ├── env
│   │   │   ├── action-creator.js
│   │   │   ├── event-emitter.js
│   │   │   ├── main.js
│   │   │   ├── request.js
│   │   │   └── store.js
│   │   ├── stylesheets （Sassファイル）
│   │   │   ├── _partial
│   │   │   └── style.sass
│   │   └── index.html
│   └── config.xml （Cordova用設定ファイル）
├── gulp
│   ├── tasks    （Gulpタスク）
│   └── config.js（Gulp用設定ファイル）
├── .gitignore
├── .eslintrc (eslintの設定ファイル）
├── README.md
├── db.json
├── gulpfile.babel.js （Gulpのエントリーポイント）
├── webpack.config.babel.base.js        (webpackのベース設定ファイル）
├── webpack.config.babel.development.js (webpackの開発用設定ファイル）
├── webpack.config.babel.production.js  (webpackの本番用設定ファイル）
└── package.json
```

## 説明

### ワークフローに関して
* モジュール管理はnpm
* ビルドにはGulpを使用
* ES6のシンタックスが使用可能
* ただし、このサンプルではCordovaはGulpから使用（[gulp-cordova](https://www.npmjs.com/package/gulp-cordova)）する想定のため上記のリンクとは方法が違う（やっていることは同じ）
* GulpからCordovaのエミュレータを起動するタスクなどは、現在調整中
* iOSやAndroidのエミュレーション環境は各自で別途構築する必要あり

### UI作成等に関して
* 内部的には、React.jsを使用したシングルページアプリケーションとして動作
* [react-router](https://github.com/rackt/react-router)でルーティングを行い、コンポーネントの表示・非表示が切り替わることによってページが遷移する（参考(http://beck23.hatenablog.com/entry/2015/02/20/054900)）
* ページ遷移時にネイティブアプリの様にアニメーションさせるため、ReactCSSTransitionGroupを使用する
* ReactCSSTransitionは、コンポーネントの描画・削除の際に動的にクラスを振ることでCSSによるスムーズなアニメーションをさせることができるReactコンポーネント(参考(https://facebook.github.io/react/docs/animation.html))
* その他、描画・削除以外に位置が変わるなどの場合は単純にCSS Transitionで対応することが可能
* ReactCSSTransitionやCSSではカバーできないような複雑なアニメーションをつけたい場合は、[Velocity.js](http://julian.com/research/velocity/)を使用する
* Reactコンポーネントは描画のタイミングに呼ばれるメソッドがいくつかあるので、これらを利用してアニメーション処理を書くことになる。(参考(https://facebook.github.io/react/docs/component-specs.html))
* ページを作るときは、main.jsのRouteを追加して、pagesディレクトリにコンポーネントを追加する

### 通信やネイティブ機能に関して
* CORSは考慮する必要がなく、config.xmlを編集し通信先を許可すればAjaxできる(参考(http://plus.adobe-adc.jp/post-4238/))
* CordovaAPI（ネイティブ機能）へのアクセスはdeviceReadyイベント後に行う(参考(http://www.buildinsider.net/mobile/bookhtml5hybrid/0401)) 
* データフローについてはこれからの課題（Ajax処理を抽象化する）

### モックアップサーバーに関して
    $ npm run server
でモックアップサーバーが起動する。  
mock/dataディレクトリの中のデータを参照してレスポンスを返す。ドメインごとにデータを分けて入れる。  
mock/server.jsで、ドメインごとにMockクラスのインスタンスを作り、モックサーバーを立てる。  

    let mainMock = new Mock([
      { path: '/movies/', json: 'mock/data/main/movies/data.json' }
    ], 8000);
コンストラクタの第一引数には、URLによって参照するjsonファイルを設定する配列を、第二引数には、ポート番号を入れる。  
jsonファイルの中で該当するキーとIDのオブジェクトの"response"プロパティ以下をjsonとして返すようになっている。  
たとえば、上の例で、mainサーバーへの'/movies/recommendation'へのリクエストであれば、'mock/data/main/movies/data.json'のrecommendationプロパティのresponseプロパティの値が返る。  

    …
      "recommendation": {
        "status": 200,
        "delay": 300,
        "response": {
          "list": [
            {
              "title": "動画1",
              "id": 1
            },
            {
              "title": "動画2",
              "id": 2
            },
            {
              "title": "動画3",
              "id": 3
            },
            …
          ]
        }
      }
    …
また、'/movies/list/1'へのリクエストであれば、'mock/data/main/data.json'のlist配列の中の、idが1のハッシュのresponseプロパティが返る。  

    …
      "list": [
          {
            "status": 200,
            "id": 1,
            "response": {
              "title": "動画1",
              "id": 1,
              "description": "Reactのテストです",
              "list": [
                {
                  "title": "動画2",
                  "id": 2
                },
                {
                  "title": "動画3",
                  "id": 3
                }
              ]
            }
          },…
    …

"status"プロパティではステータスコードを、"delay"プロパティではレスポンスを遅延させたい場合の秒数をmsで指定できる。  
"paging"プロパティを入れると、配列の一部をページングして返すことができる。"paging"の"query"プロパティはページ番号(0始まり)を指定するクエリー名を、"targetKey"はページングさせる配列のキーを、"size"は1ページの要素数を表す。  
たとえば、jsonを以下のようにすると、'/movies/recommendation?offset=1'の場合

    …
    "recommendation": {
        "status": 200,
        "delay": 300,
        "paging": {
          "query": "offset",
          "targetKey": "list",
          "size": 3
        },
        "response": {
          "list": [
            {
              "title": "動画1",
              "id": 1
            },
            {
              "title": "動画2",
              "id": 2
            },
            {
              "title": "動画3",
              "id": 3
            },
            {
              "title": "動画4",
              "id": 4
            },
            {
              "title": "動画5",
              "id": 5
            },
            {
              "title": "動画6",
              "id": 6
            },
            {
              "title": "動画7",
              "id": 7
            },
            {
              "title": "動画8",
              "id": 8
            },
            {
              "title": "動画9",
              "id": 9
            }
          ]
        }
      },
    …

以下の値が返る。  

    {
      "list": [
        {
          "title": "動画4",
          "id": 4
        },
        {
          "title": "動画5",
          "id": 5
        },
        {
          "title": "動画6",
          "id": 6
        }
      ]
    }

また、"isXML"プロパティがtrueの場合、同じ場所にあるXMLファイルを返す。  
例えば、以下の場合、'/movies/xmlSample'へのリクエストでは、'mock/data/main/movies/xmlSample.xml'の中身が返る。  

    …
    "xmlSample": {
        "status": 200,
        "delay": 100,
        "isXML": true
      }
    …

## インストール
    $ git clone http://github.team-lab.local/NHKforSchool/frontend_app.git
    $ npm install

## 使い方
開発時ビルド

    $ npm start
別ターミナルでモックアップサーバーを起動

    $ npm run server
起動後、ブラウザで`localhost:3000`を開く

本番用のビルドは

    $ npm run prod
iOSだけの場合

    $ npm run prod:ios
Androidだけの場合

    $ npm run prod:android
