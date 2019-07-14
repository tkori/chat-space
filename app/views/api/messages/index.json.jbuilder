json.array! @messages do |message|
  json.content message.content
  json.image_url message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
  json.id message.id
  json.user_name message.user.name
end