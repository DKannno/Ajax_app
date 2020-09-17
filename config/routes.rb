Rails.application.routes.draw do
  root to: 'posts#index' 
  # get 'posts/new', to: 'posts#new' ←削除
  #  get'posts',to:'posts#index'
  #  get 'posts/new', to: 'posts#new'
  post 'posts', to: 'posts#create'
  #  get 'posts', to: 'posts#checked'
  # 既読機能のエンドポイントは、queryパラメーターで設定しました
  # しかし、今回のように渡す情報が一意の情報であればpathパラメーターの方が適しています。
  get 'posts/:id', to: 'posts#checked'
end
 