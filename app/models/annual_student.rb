class AnnualStudent < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :student
  belongs_to :year

  # validates :year_id, numericality: { other_than: 1, message: "can't be blank" } 
end
