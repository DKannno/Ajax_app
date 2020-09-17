class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # @posts = Post.all  # すべてのレコードを@postsに代入
  end

  # def new
  # end
  # メモを保存した後にトップページへリダイレクトされるように追記

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
end