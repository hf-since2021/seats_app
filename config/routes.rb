Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    resources :seats, only: [:index] do
      collection do
        get "namelist"
        post "arrangement"
        get "arrangement_load"
      end
    end
  end
end
