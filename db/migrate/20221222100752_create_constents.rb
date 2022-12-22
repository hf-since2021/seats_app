class CreateConstents < ActiveRecord::Migration[6.0]
  def change
    create_table :constents do |t|
      t.string  :arrangement
      t.timestamps
    end
  end
end
