/*!
 * アーティスト診断｜アートメイクスタジオ大阪梅田院（静的版）
 * 元：https://croissant.buzz/diagnose/wYUqFgAc（クロワッサン「結果加算型」）
 * 判定：回答ごとに各アーティストへ配点を加算し最高点を表示。同点の場合は同点者からランダム（クロワッサン仕様を再現）。
 * 配点・テキスト・リンクは下の DATA を編集してください。
 */
(function () {
  'use strict';

  // ===== アーティスト（結果） =====
  // 配点の並び順：okano, kawashima, tamayama, nakashima, oda, tanaka
  var ARTISTS = ['okano', 'kawashima', 'tamayama', 'nakashima', 'oda', 'tanaka'];

  // ===== 設問・回答・配点 =====
  var QUESTIONS = [
    {
      title: 'あなたのなりたい印象は？（１つのみ）', multiple: false, limit: 1,
      answers: [
        { text: 'きれいめ・エレガントな印象', points: [0, 10, 10, 10, 0, 10] },
        { text: 'かわいらしい・やさしい印象', points: [0, 0, 0, 0, 0, 0] },
        { text: '柔らかい・ナチュラルな印象', points: [0, 10, 10, 0, 0, 10] },
        { text: 'クール・かっこいい印象', points: [10, 0, 0, 10, 10, 0] },
        { text: '海外風・モードな印象', points: [10, 0, 0, 0, 10, 0] }
      ]
    },
    {
      title: 'あなたの気になること・お悩みは？（複数可）', multiple: true, limit: 3,
      answers: [
        { text: '眉毛が薄い、まばら', points: [10, 10, 10, 10, 10, 10] },
        { text: '印象を良くしたい', points: [0, 0, 0, 10, 10, 0] },
        { text: '自分に似合う形がわからない', points: [10, 10, 10, 10, 10, 10] },
        { text: 'メイクに時間がかかる', points: [0, 10, 0, 0, 0, 10] },
        { text: 'メイクが落ちてしまう', points: [5, 0, 10, 0, 0, 0] },
        { text: '眉以外が気になる(リップ・アイライン等)', points: [5, 0, 0, 0, 0, 0] }
      ]
    },
    {
      title: 'アートメイクに求めることは？（複数可）', multiple: true, limit: 3,
      answers: [
        { text: '自眉のような毛並み感が欲しい', points: [0, 10, 0, 10, 10, 10] },
        { text: 'メイクを楽にしたい', points: [10, 0, 10, 0, 0, 0] },
        { text: '骨格に合う形を知りたい', points: [5, 10, 10, 10, 10, 10] },
        { text: '相談して決めたい', points: [0, 0, 10, 10, 10, 0] },
        { text: '経験豊富なアーティストにお任せしたい', points: [10, 10, 0, 0, 0, 10] }
      ]
    }
  ];

  // ===== リンク部品 =====
  var IG_DESC = ['アーティストのこだわりや症例をInstagramで発信中！是非チェックして♪'];
  function couponDesc(comma) {
    return [
      'こちらより診断特典（LINEクーポン）が受け取れます。',
      '取得クーポンは、LINEのマイクーポンで確認できます。',
      comma ? 'マイクーポンの確認方法は、下記をご参照ください。' : 'マイクーポンの確認方法は下記をご参照ください。'
    ];
  }
  var COUPON_IMG = 'images/coupon.webp';
  function reserve(campaign) {
    return 'https://ac.acusis.jp/reserve_v3/line/auth/auto?clinic_id=177&branch_id=1&account_unit_id=4&menu=login&utm_source=line&utm_medium=message_shindan&utm_campaign=' + campaign + '&argument=vD9P0pcX&dmai=a66a9e7f1b2b2d';
  }

  // ===== 結果 =====
  var RESULTS = {
    okano: {
      name: '岡野悠希子', image: 'images/result_okano.webp',
      desc: ['あなたの診断結果は、、、', '「凜とした素肌感を演出するプロ」', 'アーティスト｜岡野悠希子', '', '抜群のセンスと、カウンセリングで、', '完全オーダーメイドの完成度の高いアートメイクをご提供します。'],
      share: 'あなたの診断結果は、、、\n「凜とした素肌感を演出するプロ」アドバンストアーティスト｜岡野悠希子。\n抜群のセンスと、カウンセリングで完全オーダーメイドの完成度の高いアートメイクをご提供します。\n',
      // ※クロワッサン版では玉山さんのリンクが紐付いていたため、岡野さん本人のリンクに修正済み
      links: [
        { title: 'Instagramをチェック！', url: 'https://www.instagram.com/okano.artmakestudio/', desc: IG_DESC },
        { title: 'このアーティストを予約する', url: reserve('okano') },
        { title: '診断特典を受け取る', url: 'https://lin.ee/5HrrWBN', desc: couponDesc(false), img: COUPON_IMG }
      ]
    },
    kawashima: {
      name: '川嶋留美子', image: 'images/result_kawashima.webp',
      desc: ['あなたの診断結果は、、、', '「ナチュラル毛並み眉職人」', 'アーティスト｜川嶋留美子', '', 'とにかくナチュラルな仕上がりにこだわり、', 'どこからみても美しい形の毛並み眉を実現します♪'],
      share: 'あなたの診断結果は、、、\n「ナチュラル毛並み眉職人」アドバンストアーティスト｜川嶋留美子。\nとにかくナチュラルな仕上がりにこだわり、どこからみても美しい形の毛並み眉を実現します♪',
      links: [
        { title: 'Instagramをチェック！', url: 'https://www.instagram.com/kawashima.artmakestudio/', desc: IG_DESC },
        { title: 'このアーティストを予約する', url: reserve('kawashima') },
        { title: '診断特典を受け取る', url: 'https://lin.ee/fC6Y7Nc', desc: couponDesc(true), img: COUPON_IMG }
      ]
    },
    tamayama: {
      name: '玉山紋実', image: 'images/result_tamayama.webp',
      desc: ['あなたの診断結果は、、、', '「本来の美しさを邪魔しない自然な眉」', 'ジュニアアーティスト｜玉山紋実', '', '“長く付き合う眉だからこそ、数年後も違和感のないデザイン”を追求しています。', 'ナチュラル眉が好きな方、初めてのアートメイクで不安がある方にも、安心してお任せください♪'],
      share: 'あなたの診断結果は、、、\n「本来の美しさを邪魔しない自然な眉」アーティストランク｜玉山紋実\n\n“長く付き合う眉だからこそ、数年後も違和感のないデザイン”を追求しています。\nナチュラル眉が好きな方、初めてのアートメイクで不安がある方にも、安心してお任せを♪',
      links: [
        { title: '診断特典を受け取る', url: 'https://lin.ee/WqDHjt9' },
        { title: 'Instagramをチェック！', url: 'https://www.instagram.com/tamayama.artmakestudio/' },
        { title: 'このアーティストを予約する', url: reserve('tamayama') }
      ]
    },
    nakashima: {
      name: '中島彩華', image: 'images/result_nakashima.webp',
      desc: ['あなたの診断結果は、、、', '「自分史上最強美眉を！」', 'アーティスト｜中島彩華', '', '丁寧なカウンセリングと骨格診断で、', 'お一人お一人が納得できる美しい眉をデザインします♪'],
      share: 'あなたの診断結果は、、、\n「自分史上最強美眉を！」アドバンストアーティスト｜中島彩華。\n丁寧なカウンセリングと骨格診断で、お一人お一人が納得できる美しい眉をデザインします♪',
      links: [
        { title: 'Instagramをチェック！', url: 'https://www.instagram.com/nakashima.artmakestudio/', desc: IG_DESC },
        { title: 'このアーティストを予約する', url: reserve('nakashima') },
        { title: '診断結果を受け取る', url: 'https://lin.ee/lXXR59v' }
      ]
    },
    oda: {
      name: '織田舜', image: 'images/result_oda.webp',
      desc: ['あなたの診断結果は、、、', '「モテ＆垢抜け眉のプロフェッショナル」', 'アーティスト｜織田舜', '', 'お悩みを解決して、自信が持てようなモテ＆垢抜け眉を！', '性別にとらわれないアートメイクの可能性を追求します♪'],
      share: 'あなたの診断結果は、、、\n「モテ＆垢抜け眉のプロフェッショナル」アーティスト｜織田舜。\nお悩みを解決して、自信が持てようなモテ＆垢抜け眉を！\n性別にとらわれないアートメイクの可能性を追求します♪',
      links: [
        { title: 'Instagramをチェック！', url: 'https://www.instagram.com/oda.artmakestudio/?igshid=MzRlODBiNWFlZA%3D%3D', desc: IG_DESC },
        { title: 'このアーティストを予約する', url: reserve('oda') },
        { title: '診断特典を受け取る', url: 'https://lin.ee/TkOxzzK', desc: couponDesc(true), img: COUPON_IMG }
      ]
    },
    tanaka: {
      name: '田中舞', image: 'images/result_tanaka.webp',
      desc: ['あなたの診断結果は、、、', '「まるで自眉」なナチュラル眉を作ります', 'アーティスト｜田中舞', '', 'すっぴんでも浮かないナチュラルさ重視', '働くママだけでなく全ての方を幸せにします'],
      share: 'あなたの診断結果は、、、\n「時短メイクで働くママを応援！」アーティスト｜田中舞。\nやってよかったと心から思える「キレイ＆時短メイク」で、働くママだけでなく全ての方を幸せにします♪',
      links: [
        { title: 'Instagramをチェック！', url: 'https://www.instagram.com/tanaka.artmakestudio/', desc: IG_DESC },
        { title: 'このアーティストを予約する', url: reserve('tanaka.mai') },
        { title: '診断特典を受け取る', url: 'https://lin.ee/T91DFyC', desc: couponDesc(true), img: COUPON_IMG }
      ]
    }
  };

  var SHARE_TITLE = 'アーティスト診断｜アートメイクスタジオ大阪梅田院';

  var PRIVACY = 'ARTMAKESTUDIO by MISELCLINICは、個人情報保護法に基づく当クリニックの基本方針及び取り組みとして、下記の個人情報保護方針を制定いたします。\n第1条(プライバシー情報)\nプライバシー情報のうち「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。\nプライバシー情報のうち「個人関連情報」とは、上記に定める「個人情報」以外のものをいい、申し込みや問い合わせをされたサービスやご覧になったページや広告の履歴、ユーザーが検索された検索キーワード、ご利用日時、ご利用の方法、ご利用環境、郵便番号や性別、職業、年齢、ユーザーのIPアドレス、クッキー情報、位置情報、端末の個体識別情報などを指します。\n第2条(プライバシー情報の収集方法)\n当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や、決済に関する情報を当社の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。\n当社は、ユーザーについて、利用したサービスやソフトウエア、購入した商品、閲覧したページや広告の履歴、検索した検索キーワード、利用日時、利用方法、利用環境（携帯端末を通じてご利用の場合の当該端末の通信状態、利用に際しての各種設定情報なども含みます）、IPアドレス、クッキー情報、位置情報、端末の個体識別情報などの履歴情報および特性情報を、ユーザーが当社や提携先のサービスを利用しまたはページを閲覧する際に収集します。\n当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくはこちら、またはこちらをクリックしてください。\n第3条(個人情報を収集・利用する目的)\n当社が個人情報を収集・利用する目的は、以下のとおりです。\nユーザーに自分の登録情報の閲覧や修正、利用状況の閲覧を行っていただくために、氏名、住所、連絡先、支払方法などの登録情報、利用されたサービスや購入された商品、およびそれらの代金などに関する情報を表示する目的\nユーザーにお知らせや連絡をするためにメールアドレスを利用する場合やユーザーに商品を送付したり必要に応じて連絡したりするため、氏名や住所などの連絡先情報を利用する目的\nユーザーの本人確認を行うために、氏名、生年月日、住所、電話番号、銀行口座番号、クレジットカード番号、運転免許証番号、配達証明付き郵便の到達結果などの情報を利用する目的\nユーザーに代金を請求するために、購入された商品名や数量、利用されたサービスの種類や期間、回数、請求金額、氏名、住所、銀行口座番号やクレジットカード番号などの支払に関する情報などを利用する目的\nユーザーが簡便にデータを入力できるようにするために、当社に登録されている情報を入力画面に表示させたり、ユーザーのご指示に基づいて他のサービスなど（提携先が提供するものも含みます）に転送したりする目的\n代金の支払を遅滞したり第三者に損害を発生させたりするなど、本サービスの利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの利用をお断りするために、利用態様、氏名や住所など個人を特定するための情報を利用する目的\nユーザーからのお問い合わせに対応するために、お問い合わせ内容や代金の請求に関する情報など当社がユーザーに対してサービスを提供するにあたって必要となる情報や、ユーザーのサービス利用状況、連絡先情報などを利用する目的\n各種統計、分析、広告宣伝、マーケティングに利用する目的\n上記の利用目的に付随する目的\n第4条(個人情報の第三者提供)\n当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。\n法令に基づく場合\n人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき\n公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき\n国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき\n予め次の事項を告知あるいは公表をしている場合\n利用目的に第三者への提供を含むこと\n第三者に提供されるデータの項目\n第三者への提供の手段または方法\n本人の求めに応じて個人情報の第三者への提供を停止すること\n前項の定めにかかわらず，次に掲げる場合は第三者には該当しないものとします。\n当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合\n合併その他の事由による事業の承継に伴って個人情報が提供される場合\n個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いているとき\n第5条(個人情報の開示)\n当社は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。なお、個人情報の開示に際しては、1件あたり1,000円の手数料を申し受けます。\n本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合\n当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合\nその他法令に違反することとなる場合\n前項の定めにかかわらず、個人情報以外の情報については、原則として開示いたしません。\n第6条(個人情報の訂正および削除)\nユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、当社に対して個人情報の訂正または削除を請求することができます。\n当社は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正または削除を行い、これをユーザーに通知します。\n第7条(個人情報の利用停止)\n当社は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行い、その結果に基づき、個人情報の利用停止等を行い、その旨本人に通知します。ただし、個人情報の利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、本人の権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策を講じます。\n第8条(プライバシーポリシーの変更)\n本ポリシーの内容は、ユーザーに通知することなく、変更することができるものとします。\n当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。\n第9条(お問い合わせ窓口)\n本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。\n\nARTMAKESTUDIO by MISELCLINIC\n住所：大阪府 大阪市北区梅田1-9-20 大阪マルビル5階 ミセルクリニック院内併設(大阪駅から徒歩3分)\nEメールアドレス：info@miselclinic.com';

  // ===== 判定ロジック =====
  function score(selected) {
    var total = ARTISTS.map(function () { return 0; });
    selected.forEach(function (idxs, q) {
      idxs.forEach(function (a) {
        QUESTIONS[q].answers[a].points.forEach(function (p, i) { total[i] += p; });
      });
    });
    return total;
  }
  function judge(selected) {
    var s = score(selected);
    var max = Math.max.apply(null, s);
    var tied = ARTISTS.filter(function (_, i) { return s[i] === max; });
    return tied[Math.floor(Math.random() * tied.length)]; // 同点はランダム
  }

  // ===== 画面制御 =====
  var $ = function (id) { return document.getElementById(id); };
  var views = ['top', 'question', 'bridge', 'result'];
  var state = { q: 0, selected: QUESTIONS.map(function () { return []; }) };

  function show(name) {
    views.forEach(function (v) { $('view-' + v).hidden = (v !== name); });
    window.scrollTo(0, 0);
  }
  function track(event, params) {
    window.dataLayer = window.dataLayer || [];
    var o = { event: event }; for (var k in params) o[k] = params[k];
    window.dataLayer.push(o);
  }
  function esc(t) { return t.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function paragraphs(lines) {
    return lines.map(function (l) { return l === '' ? '<p><br></p>' : '<p>' + esc(l) + '</p>'; }).join('');
  }
  var CHECK = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

  function renderQuestion() {
    var q = QUESTIONS[state.q], sel = state.selected[state.q];
    $('q-num').textContent = state.q + 1;
    $('dots').innerHTML = QUESTIONS.map(function (_, i) { return '<span class="' + (i === state.q ? 'on' : '') + '"></span>'; }).join('');
    $('q-title').textContent = q.title;
    $('q-sub').hidden = !q.multiple;
    $('q-sub').textContent = '（' + q.limit + 'つまで選択可能）';
    $('q-error').hidden = true;
    var full = q.multiple && sel.length >= q.limit;
    $('options').innerHTML = q.answers.map(function (a, i) {
      var on = sel.indexOf(i) > -1;
      return '<button type="button" class="option' + (on ? ' selected' : '') + '" data-i="' + i + '"' +
        (full && !on ? ' disabled' : '') + ' aria-pressed="' + on + '"><span class="check">' + CHECK + '</span>' + esc(a.text) + '</button>';
    }).join('');
    // 1問目（単一選択）は選択で自動遷移のためナビ非表示
    $('q-nav').hidden = !q.multiple;
    $('prev').hidden = state.q === 0;
  }

  function goNext() {
    if (!state.selected[state.q].length) { $('q-error').hidden = false; return; }
    if (state.q < QUESTIONS.length - 1) { state.q++; renderQuestion(); window.scrollTo(0, 0); }
    else { show('bridge'); }
  }

  function renderResult(key) {
    var r = RESULTS[key];
    $('result-image').src = r.image;
    $('result-image').alt = r.name;
    $('result-desc').innerHTML = paragraphs(r.desc);
    $('result-links').innerHTML = r.links.map(function (l) {
      var d = '';
      if (l.desc || l.img) {
        d = '<div class="link-desc">' + (l.desc ? paragraphs(l.desc) : '') +
          (l.img ? '<p><img src="' + l.img + '" alt="LINEマイクーポン確認方法" loading="lazy"></p>' : '') + '</div>';
      }
      return '<div class="link-block">' + d + '<a class="btn-link" href="' + esc(l.url) + '" target="_blank" rel="noopener" data-link="' + esc(l.title) + '">' + esc(l.title) + '</a></div>';
    }).join('');
    // シェア（元設定：シェアURL＝トップページ、本文＝結果ごとのシェア文）
    var url = location.href.split('?')[0].split('#')[0];
    $('share-x').href = 'https://twitter.com/intent/tweet?' + new URLSearchParams({ text: r.share, url: url }).toString();
    $('share-line').href = 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url);
    $('share-fb').href = 'https://www.facebook.com/sharer/sharer.php?' + new URLSearchParams({ u: url, hashtag: '#' + SHARE_TITLE }).toString();
    $('share-copy').onclick = function () {
      var done = function () { $('copied').hidden = false; setTimeout(function () { $('copied').hidden = true; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done); else done();
    };
    show('result');
  }

  // ===== イベント =====
  $('policy').innerHTML = esc(PRIVACY).replace('info@miselclinic.com', '<a href="mailto:info@miselclinic.com">info@miselclinic.com</a>');
  $('consent').addEventListener('change', function () { $('start').disabled = !this.checked; });
  $('start').addEventListener('click', function () {
    state.q = 0; state.selected = QUESTIONS.map(function () { return []; });
    renderQuestion(); show('question'); track('diagnosis_start', {});
  });
  $('options').addEventListener('click', function (e) {
    var b = e.target.closest('.option'); if (!b || b.disabled) return;
    var i = +b.getAttribute('data-i'), q = QUESTIONS[state.q], sel = state.selected[state.q];
    if (!q.multiple) { state.selected[state.q] = [i]; renderQuestion(); setTimeout(goNext, 200); return; }
    var p = sel.indexOf(i);
    if (p > -1) sel.splice(p, 1); else if (sel.length < q.limit) sel.push(i);
    renderQuestion();
  });
  $('next').addEventListener('click', goNext);
  $('prev').addEventListener('click', function () { if (state.q > 0) { state.q--; renderQuestion(); window.scrollTo(0, 0); } });
  $('back-to-answers').addEventListener('click', function () { renderQuestion(); show('question'); });
  $('submit').addEventListener('click', function () {
    var key = judge(state.selected);
    track('diagnosis_complete', { artist: key, artist_name: RESULTS[key].name });
    renderResult(key);
  });
  $('result-links').addEventListener('click', function (e) {
    var a = e.target.closest('a[data-link]'); if (!a) return;
    track('diagnosis_link_click', { link_title: a.getAttribute('data-link'), link_url: a.href });
  });

  // デバッグ・確認用：?result=okano 等で結果ページを直接表示
  var m = location.search.match(/[?&]result=([a-z]+)/);
  if (m && RESULTS[m[1]]) renderResult(m[1]);

  // テスト用に公開
  window.__diagnosis = { score: score, judge: judge, QUESTIONS: QUESTIONS, ARTISTS: ARTISTS };
})();
