class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :isCompleted

  has_many :tags
end
