# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 生徒の基本データ
# [
#   [100001,"小西","伸江","ｺﾆｼ","ﾉﾌﾞｴ",3],
#   [100002,"永井","浩治","ﾅｶﾞｲ","ｺｳｼﾞ",2],
#   [100003,"中田","記代","ﾅｶﾀ","ｷﾖ",3],
#   [100004,"花田","奈緒","ﾊﾅﾀﾞ","ﾅｵ",3],
#   [100005,"石井","則昭","ｲｼｲ","ﾉﾘｱｷ",2],
#   [100006,"青木","徳彦","ｱｵｷ","ﾉﾘﾋｺ",2],
#   [100007,"石川","義隆","ｲｼｶﾜ","ﾖｼﾀｶ",2],
#   [100008,"神田","多紀子","ｺｳﾀﾞ","ﾀｷｺ",3],
#   [100009,"三浦","房実","ﾐｳﾗ","ﾌｻﾐ",3],
#   [100010,"今野","一樹","ｺﾝﾉ","ﾋﾄｷ",2]
# ].each do |code, last_name, first_name, last_name_kana, first_name_kana, sex_id|
#   Student.create!(
#     {code: code, last_name: last_name, first_name: first_name, last_name_kana: last_name_kana, first_name_kana: first_name_kana, sex_id: sex_id}
#   )
# end

# 生徒の年次データ
[
  [100001,4,"2","A",1],
  [100002,4,"2","A",2],
  [100003,4,"2","A",3],
  [100004,4,"2","A",4],
  [100005,4,"2","A",5],
  [100006,4,"2","A",6],
  [100007,4,"2","A",7],
  [100008,4,"2","A",8],
  [100009,4,"2","A",9],
  [100010,4,"2","A",10]
].each do |code, year_id, school_grade, klass, number|
  AnnualStudent.create!(
    {student_code: code, year_id: year_id, school_grade: school_grade, klass: klass, number: number}
  )
end