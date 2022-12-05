class Student < ApplicationRecord
  self.primary_key = :code
  has_many :annual_students, foreign_key: :student_code, class_name: "AnnualStudent"

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :sex
end
