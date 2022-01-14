module Api
    module V1
        class TasksController < ApplicationController
            protect_from_forgery with: :null_session
            
            def index
                tasks = Task.all

                render json: TaskSerializer.new(tasks, options).serialized_json
            end

            def show
                tasks = Task.find(params[:id])
            
                render json: TaskSerializer.new(tasks, options).serialized_json
            end

            def create  
                tasks = Task.new(tasks_params)

                if tasks.save
                    render json: TaskSerializer.new(tasks).serialized_json
                else
                    render json: { error: tasks.errors.messages }, status: 422
                end
            end

            def update
                tasks = Task.find(params[:id])

                if tasks.update(tasks_params)
                    render json: TaskSerializer.new(tasks, options).serialized_json
                else
                    render json: { error: tasks.errors.messages }, status: 422
                end
            end

            def destroy
                tasks = Task.find(params[:id])

                if tasks.destroy
                    head :no_content    
                else
                    render json: { error: tasks.errors.messages }, status: 422
                end
            end

            private

            def tasks_params
                params.require(:task).permit(:name, :isCompleted)
            end

            def options
                @options ||=  {include: %i[tags] }

            end 
        end
    end

end
