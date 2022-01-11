class TagSerializer
  include FastJsonapi::ObjectSerializer
  attributes :tagName, :task_id
end
