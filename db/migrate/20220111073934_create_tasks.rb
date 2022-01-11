class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :isCompleted

      t.timestamps
    end
  end
end
