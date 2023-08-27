# Drop Numbers Game 開発

## 環境構築手順

1. [Docker Desktop](https://www.docker.com/products/docker-desktop) をインストールしておきます。

2. ターミナル（コマンド プロンプト）に次のコマンドを入力します：

```bash
git clone git@github.com:CS-MokuMoku-Team-4/drop-numbers-game.git
cd drop-numbers-game
```

3. ターミナルに次のコマンドを入力して、イメージをビルドしてコンテナを起動します（コンテナの起動のみを行う場合には、「docker-compose up」のみを入力します）。：

```bash
docker-compose up --build
```

4. 開発用サーバーが立ち上がります。ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスすると、Next.jsアプリケーションが表示されます。

5. コンテナを停止するには、docker-compose コマンドを実行しているターミナルで Ctrl + C を押します。その後、ターミナルに次のコマンドを入力します：

```bash
docker-compose down
```
