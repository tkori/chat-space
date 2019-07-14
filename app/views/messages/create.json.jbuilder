json.id @message.id
json.content @message.content
json.image_url @message.image.url
json.user_name @message.user.name
json.group_id @message.group_id
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")