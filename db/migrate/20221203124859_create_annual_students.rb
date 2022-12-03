class CreateAnnualStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :annual_students do |t|
      t.integer  :student_code,  limit: 3, unsigned: true, null: false
      t.integer  :year_id,       limit: 1, unsigned: true, null: false
      t.string   :school_grade,  limit: 3
      t.string   :klass,         limit: 3
      t.integer  :number,        limit: 1, unsigned: true
      t.timestamps
    end

    add_foreign_key :annual_students, :students, column: :student_code, primary_key: "code"
  end
end
