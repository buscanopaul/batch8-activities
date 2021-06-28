class Comparison
  def initialize(num1, num2)
    @num1 = num1
    @num2 = num2
  end

  def winner
    if @num1 > @num2
      puts "Number 1 is greater than Number 2"
    elsif @num2 > @num1
      puts "Number 2 is greater than Number 1"
    else
      puts "Numbe is equal"
    end
  end
end

compare = Comparison.new(5, 1)
puts compare.winner
