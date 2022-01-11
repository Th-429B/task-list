# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tasks = Task.create([
    {
        name: "Do homework",
        isCompleted: false
    },
    {
        name: "Do Assignment",
        isCompleted: false
    },
    {
        name: "Revise for test",
        isCompleted: false
    },
    {
        name: "Watch lecture",
        isCompleted: false
    }
])

tags = Tag.create([
    {
        tagName: "Very Important",
        task: tasks.first
    },
    {
        tagName: "By today",
        task: tasks.first
    }
])