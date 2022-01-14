module Api
    module V1
        class TagsController < ApplicationController
            protect_from_forgery with: :null_session

            def create 
                tag = Tag.new(tag_params)

                if tag.save 
                    render json: TagSerializer.new(tag).serialized_json
                else
                    render json: { error: tag.errors.messages }, status: 422
                end 
            end

            def destroy 
                tag = Tag.find(params[:id])

                if tag.destroy 
                    head :no_content
                else
                    render json: { error: tag.errors.messages }, status: 422
                end 
            end

            private

            def tag_params
                params.require(:tag).permit(:tagName, :task_id)
            end
        
        end
    end

end