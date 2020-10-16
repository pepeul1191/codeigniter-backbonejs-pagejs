require 'sequel'
require 'mysql2'

# database and models config


def tw_pass
  charset = Array('A'..'Z') + Array('a'..'z') + ['0', '1', '2', '3', '4', '5', '6', '7', '8' , '9']
  Array.new(6) { charset.sample }.join
end

def ad_user
  rand(101..999).to_s + ' ' + rand(101..999).to_s + ' ' + rand(101..999).to_s
end

def fill_students
  f = File.open('students.txt', "r")
  f.each_line do |line|
    data = line.split('::')
    DB.transaction do
      begin
        # create or check country
        country_name = data[6].strip
        country = Country.where(
          :name => country_name
        ).first
        if country == nil
          country = Country.new(
            :name => country_name,
          )
          country.save
        end
        # create student
        gender_id = 1
        if data[5] == 'Female'
          gender_id = 2
        end
        carrer_id = rand(1..5) 
        n = Student.new(
          :code => data[0],
          :names => data[1],
          :last_names => data[2],
          :personal_email => data[3],
          :email => data[4],
          :tw_user => tw_user(),
          :tw_pass => tw_pass(),
          :ad_user => ad_user(),
          :gender_id => gender_id,
          :carrer_id => carrer_id,
          :country_id => country.id,
        )
        n.save
      rescue Exception => e
        Sequel::Rollback
        puts 'error!'
        puts e.message
        puts e.backtrace
      end
    end
  end
  f.close
end

fill_students
