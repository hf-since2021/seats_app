class SheetsController < ApplicationController
  def index
    # session[:user_id] = 1
    # render json: { message: 'ok'}

  end

  # http method "get"
  def namelist
    students = AnnualStudent.where({year_id: 4, school_grade: "2", klass: "A"}).includes(:student).map.with_index(1) do |s, index|
      # student_basic_information
      sb = s.student
      {
        id:   index,
        code: s.student_code,
        gcn:  "#{s.school_grade}#{s.klass}#{format("%02<number>d", number: s.number)}",
        name: "#{sb.last_name} #{sb.first_name}",
        kana: "#{sb.last_name_kana} #{sb.first_name_kana}",
        sex:  Sex.find(sb.sex_id).name,
      }
    end
    render json: { message: 'ok'}
  end
end
