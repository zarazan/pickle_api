# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_18_203536) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", force: :cascade do |t|
    t.bigint "odd_id"
    t.bigint "user_id"
    t.bigint "pool_id"
    t.bigint "entry_id"
    t.decimal "amount"
    t.string "result"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "entries", force: :cascade do |t|
    t.bigint "pool_id"
    t.bigint "user_id"
    t.decimal "bank"
    t.index ["pool_id", "user_id"], name: "index_entries_on_pool_id_and_user_id", unique: true
  end

  create_table "fixtures", force: :cascade do |t|
    t.string "sport"
    t.datetime "start_time"
    t.bigint "home_team_id"
    t.bigint "away_team_id"
    t.integer "home_score"
    t.integer "away_score"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "odds", force: :cascade do |t|
    t.string "type"
    t.bigint "fixture_id"
    t.string "odd_type"
    t.decimal "ratio"
    t.decimal "metric"
    t.bigint "team_id"
    t.string "player"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pools", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.datetime "start_date"
    t.datetime "end_date"
    t.decimal "bankroll"
    t.jsonb "bet_types"
    t.jsonb "sports"
    t.jsonb "email_invites"
    t.boolean "private"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "sport"
    t.string "the_odds_api_key"
    t.index ["name", "sport"], name: "index_teams_on_name_and_sport", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

end
