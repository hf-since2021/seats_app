class AnnualStudent < ApplicationRecord
  belongs_to :student, foreign_key: :student_code, class_name: "Student"

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :year

  # validates :year_id, numericality: { other_than: 1, message: "can't be blank" } 
end
