# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_12_03_124859) do

  create_table "annual_students", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.integer "student_code", limit: 3, null: false, unsigned: true
    t.integer "year_id", limit: 1, null: false, unsigned: true
    t.string "school_grade", limit: 3
    t.string "klass", limit: 3
    t.integer "number", limit: 1, unsigned: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_code"], name: "fk_rails_061cec5e43"
  end

  create_table "students", primary_key: "code", id: :integer, limit: 3, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.string "last_name", limit: 31
    t.string "first_name", limit: 31
    t.string "last_name_kana", limit: 31
    t.string "first_name_kana", limit: 31
    t.integer "sex_id", limit: 1, unsigned: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "annual_students", "students", column: "student_code", primary_key: "code"
end
