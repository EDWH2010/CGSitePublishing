これはCG投稿サイトです。(未完成ですが)

コンセプト：





まず以下の手順を踏んでください

Nodejsツールをインストールしてください。
URL:https://nodejs.org/ja/download/

インストール終わった後(WINDOWSバージョン)

CMD(コマンドプロンプト)を使い (Window)

npm startと入力してエンターキーを押してください。

そしたら以下表示されるはずです。

server running on port 3000 (localhost:3000 ローカルサーバー)

Is MsqlConnection Problem? : Error: connect ECONNREFUSED 127.0.0.1:3306(Mysqlサーバーにつながっていないってこと)

Mysqlサーバーが稼働してる場合
Is MsqlConnection Problem? : null　はつまりMysqlサーバーにつながっていること。



CurrentDirectory(カレントディレクトリー)：

./views:ウェブページを表す（.ejs）

./src:コンポーネントやデータ用

./routes:サーバー上でウェブページを表すための設定

./public/css/:スタイルシートの設定

./public/images/:イメージファイル(.jpg|.png)

./public/lib/backend/：バックエンド設定

./public/lib/class/:クラス定義フォルダー

./public/lib/ChatRoomFunction.js:チャット機能設定

./public/lib/indexPageSetting.js:ホームページでの設定

./public/lib/PageLoading.js:ページのローディング設定

./public/lib/PageMemberFunction.js:会員設定

/public/lib/PageSearchFunction.js:各種捜索の機能(作品)

./public/lib/PageWorkFunction.js:作品投稿に関する設定


./index.js:サーバーを起動(cmdでnpm startと入力)