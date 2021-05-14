# name: discourse-user-search
# version: 0.7.0

enabled_site_setting :user_search_enabled
register_asset 'stylesheets/discourse_user_search.css'
after_initialize do
  load File.expand_path('../app/controllers/discourse_user_search_controller.rb', __FILE__)

  Discourse::Application.routes.append do
    get "/discourse_user_search" => 'discourse_user_search#index'
    post "/discourse_user_search_list" => 'discourse_user_search#search'
  end
end
