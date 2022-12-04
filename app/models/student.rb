class Student < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  has_many :annual_students
  belongs_to :sex
end
