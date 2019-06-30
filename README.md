# DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|encrypted_password|string|null: false|
|reset_password_token|string||

### Association
has_many :groups, through: :members
has_many :members
has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null:false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
belongs_to :user
belongs_to :group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user