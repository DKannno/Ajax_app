function check() {
  // 表示されている全てのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成
      const XHR = new XMLHttpRequest();
      // どのようなリクエストにするのか詳細をopenで指定
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスとして欲しい情報の形式をリクエストの際に指定する。
      XHR.responseType = "json";
      // sendメソッドを記述して初めてリクエストができる。引数の指定はとくにいらない。
      XHR.send();
      // レスポンスを受け取った時の処理をき術する
      XHR.onload = () => {
        // // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了している
          return null;          
        }
        // レスポンスされたでーたを変数itemに代入している
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
};
// window.addEventListener("load", check);
// メモ機能に非同期通信を実装ごはリロードとかしない限りcheckが実行されないので。
setInterval(check, 1000);