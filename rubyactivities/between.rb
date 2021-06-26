prompt = "> "
puts "Enter number"
print prompt
number = gets.chomp.to_i

if number > 100
    puts "Your number:#{number} is Above 100"
elsif number >= 0 && number <= 50
    puts "Your number:#{number} is between 0 to 50"
elsif number >= 51 && number <= 100
    puts "Your number:#{number} is between 51 to 100"
else
    puts "Your number:#{number} is less than 0"
end
