class Year < ActiveHash::Base
  self.data = [
    { id: 1, name: '---' },
    { id: 2, name: '2020' },
    { id: 3, name: '2021' },
    { id: 4, name: '2022' },
    { id: 5, name: '2023' },
  ]

  include ActiveHash::Associations
  has_many :annual_students
end