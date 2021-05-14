class DiscourseUserSearchController < ApplicationController
  def index
  end

  def search
    dynamodb = Aws::DynamoDB::Client.new(
      access_key_id: ENV['ACCESS_KEY_ID'],
      secret_access_key: ENV['SECRET_ACCESS_KEY'],
      region: AWS_REGION
    )

    scan_condition = {
      table_name: "DiscourseUserInformation"
    }
    result = dynamodb.scan(scan_condition)

    result = result.items
    Rails.logger.info result
    data = result.map do |user_data|
      user = User.find(user_data['UserID'])
      user_data['avatar_template'] = user.avatar_template
      user_data['username'] = user.username
      next user_data

    end

    render status: 200, json: { status: 200, data: data }
  end
end
