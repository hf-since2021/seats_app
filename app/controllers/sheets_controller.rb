class SheetsController < ApplicationController
  def index
    session[:user_id] = 1
    render json: { message: 'ok'}
  end
end
