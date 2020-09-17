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

  # checkedアクションは、「既読」の操作を行ったときに実行されるアクションです。
  def checked
    # binding.pry
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    item = Post.find(params[:id])
    render json: { post: item }
  end

end