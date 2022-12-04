Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    resources :sheets, only: [:index] do
      collection do
        post "namelist"
      end
    end
  end
end
