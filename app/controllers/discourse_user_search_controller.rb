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
    # user_ids = result.map {|information| information['UserID']}
    #
    # Rails.logger.info result
    # user= User.find_by_sql("select * from users where id in (#{user_ids.join(',')})")
    # data = result.map do |user_data|
    #   user_data['avatar_template'] = user.avatar_template
    #   user_data['username'] = user.username
    #   user_data['GradeYear'] = user_data['GradeYear'].to_i
    #   next user_data
    #
    # end
    data = result.map do |user_data|
      user_data['GradeYear'] = user_data['GradeYear'].to_i
      next user_data

    end

    render status: 200, json: { status: 200, data: data }
  end
end
