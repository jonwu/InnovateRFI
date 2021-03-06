class EvaluationController < ApplicationController
  respond_to :html, :js
  before_action :authenticate_user!

  def show
  	current_rfi = Rfi.find_by_id(params[:id])
		# Check if RFI is from current user
		if current_rfi != nil && current_rfi.user_id == current_user.id 
			set_current_rfi(current_rfi)
			@categories = get_categories
			# defaults when first loading
      if params.has_key?(:category_id)
        @active_category = set_active_category(@categories.find_by_id(params[:category_id]))
      else
        @active_category = set_active_category(get_categories.first)
      end
      @active_question = set_active_question(Question.find_by_id(@active_category.questions.first.id))
      @current_submissions = set_current_submissions(current_rfi.submissions.where(question_id: @active_question.id).order("id DESC"))
      
      # find number of unrated submissions
			set_collaborators(current_rfi.collaborators)
      @num_unrated = Submission.get_number_unrated(get_categories, get_collaborators)
		else
			redirect_home
		end
  end

	def index
    redirect_home
	end

	def update_active_category
    set_active_category(Category.find_by_id(params[:category]))
    redirect_to evaluation_page_update_path
  end

  def update_active_question
  	set_active_question(Question.find_by_id(params[:question]))
  	set_current_submissions(Submission.find_submissions_from_collaborators(get_active_question, get_collaborators))
    redirect_to evaluation_page_update_path
  end

  def page_update
    @categories = get_categories
    @active_category = get_active_category
    @active_question = get_active_question
    @current_submissions = get_current_submissions
    @num_unrated = Submission.get_number_unrated(get_categories, get_collaborators)
  end

  def save_rating
  	submission_id = params[:submission_id]
  	rating = params[:rating]
  	submission = Submission.find_by_id(submission_id)
  	submission.update(score: rating)
    redirect_to evaluation_categories_page_update_path
  end

  def categories_page_update
    @categories = get_categories
    @active_category = get_active_category
    @active_question = get_active_question
    # need to reset the current submissions to include updated score and then update page.
    @current_submissions = set_current_submissions(Submission.find_submissions_from_collaborators(get_active_question, get_collaborators))
    @num_unrated = Submission.get_number_unrated(get_categories, get_collaborators)
  end

	private
    $rfi
    $active_category
    $active_question
    $collaborators
    $current_submissions

    def set_current_rfi(rfi)
      $rfi = rfi
    end

    def get_current_rfi
      return $rfi
    end

    def set_collaborators(collaborators)
      $collaborators = collaborators
    end

    def get_collaborators
      return $collaborators
    end

    def get_categories
    	if !$rfi.nil?
      	return $rfi.categories.all
      end
    end

    def set_active_category(active_category)
      $active_category = active_category
      return $active_category
    end

    def get_active_category
      return $active_category
    end

    def set_active_question(active_question)
      $active_question = active_question
      return $active_question
    end

    def get_active_question
      return $active_question
    end

    def set_current_submissions(current_submissions)
      $current_submissions = current_submissions
    end

    def get_current_submissions
      return $current_submissions
    end
end
