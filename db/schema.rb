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

ActiveRecord::Schema.define(version: 2020_10_16_000713) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", force: :cascade do |t|
    t.bigint "odd_id"
    t.bigint "user_id"
    t.decimal "amount"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "the_odds_api_key"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
  end

end
