function memo() {
  // viewファイルから「投稿する」ボタンの情報を取得。
  const submit = document.getElementById("submit");
  // memo.jsに、クリック時のイベントを定義
  submit.addEventListener("click", (e) => {
    // リクエストを送信する記述
    const formData = new FormData(document.getElementById("form"));
    // XMLHttpRequestを定義しましょう
    const XHR = new XMLHttpRequest();
    // XMLHttpRequestを初期化する記述
    XHR.open("POST", "/posts", true);
    // レスポンスの形式を定義
    XHR.responseType = "json";
    // リクエストを送信する記述
    XHR.send(formData);

    // 🌟レスポンスがあった場合の処理を記述🌟
    // エンドポイントにメモ投稿の内容を送信できたら
    // サーバーサイドの処理が成功すればでーたが返却される
    // 以下はそのデータを受け取り、「HTMLのメモ部分」を描画する処理を記述です
    XHR.onload = () => {
      // 200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // itemは、レスポンスとして返却されたメモのレコードデータを取得しています。
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
      // formTextを取得する理由は、メモの入力フォームをリセットするためです。この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要があります。ここではリセット対象の要素であるcontentという要素を取得しています。
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義しています。HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画されるわけです。
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // listという要素に対して、insertAdjacentHTMLでHTMLを追加します。
      // 第一引数はafterendを指定することで、要素listの直後に挿入できます。
      list.insertAdjacentHTML("afterend", HTML);
      // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組みです。
      formText.value = "";
    };
    // プログラム本来の処理を、止める.投稿するクリックしたときのイベント処理
    e.preventDefault();
 });
}
// ページを読み込んだときに実行されるようにしましょう
window.addEventListener("load", memo);
