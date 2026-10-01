# アーティスト診断（静的版）

アートメイクスタジオ大阪梅田院「アーティスト診断」（元：https://croissant.buzz/diagnose/wYUqFgAc）を静的HTMLで再構築したものです。サーバー側の処理は不要で、フォルダごとアップすれば動きます。

## フォルダ構成
```
index.html        … ページ本体（トップ → 質問3問 → 確認 → 結果 を1ページで切替）
assets/style.css  … デザイン（クロワッサン版の寸法・色を再現）
assets/app.js     … 配点・判定ロジック・結果テキスト・リンク
images/           … ロゴ・トップ画像・結果画像6枚・クーポン説明画像・OGP・SNSアイコン
```

## 判定ロジック（クロワッサンの「結果加算型」と同じ）
- 回答ごとに6名へ配点を加算し、最高点のアーティストを表示
- 同点の場合は同点者からランダム表示（クロワッサン仕様を再現）
- 配点は `assets/app.js` の `QUESTIONS[].answers[].points` を編集（並び：岡野, 川嶋, 玉山, 中島, 織田, 田中）

## クロワッサン版からの変更点
- 岡野悠希子さんの結果に玉山さんのリンクが紐付いていたため、岡野さん本人のInstagram・予約（utm_campaign=okano）・特典リンクに修正

## アップ前に確認すること
1. `index.html` の `og:url` / `og:image` を公開URL（絶対URL）に書き換える
2. 計測タグ（GTM等）が必要なら `index.html` の `<head>` 内コメント位置に貼る
   - dataLayer イベント：`diagnosis_start` / `diagnosis_complete`（artist, artist_name）/ `diagnosis_link_click`
3. フッターの「利用規約」「プライバシーポリシー」はクロワッサンのPDFにリンクしたままなので、自社ページに差し替えるか削除する
4. `meta robots` は元と同じ `noindex,follow`。検索に出したい場合は変更する
5. 確認用：`index.html?result=okano`（kawashima / tamayama / nakashima / oda / tanaka）で各結果ページを直接表示できます
