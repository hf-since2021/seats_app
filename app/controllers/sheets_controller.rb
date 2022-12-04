class SheetsController < ApplicationController
  def index
    # session[:user_id] = 1
    # render json: { message: 'ok'}

  end

  # http method "post"
  def namelist
    # binding.pry
    render json: { message: 'ok'}
  end
end
