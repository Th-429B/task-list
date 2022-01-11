Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'pages#index'

  namespace :api do
    resources :tasks,
    resources :tags, only: [:create, :destroy]
  end

  get '*path', to: 'pages#index', via: :all
end
