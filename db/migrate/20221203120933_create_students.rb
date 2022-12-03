class CreateStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :students, id: false do |t|
      # "code"を自然キーに設定。符号なしMediumInt
      t.integer  :code,   limit: 3, unsigned: true, null: false,  primary_key: true
      t.string   :last_name,        limit: 31
      t.string   :first_name,       limit: 31
      t.string   :last_name_kana,   limit: 31
      t.string   :first_name_kana,  limit: 31
      t.integer  :sex_id, limit: 1, unsigned: true
      t.timestamps
    end
  end
end
