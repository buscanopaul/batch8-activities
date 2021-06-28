class Confection
  def prepare
    puts "test"
  end
end

class Cupcake < Confection
  def prepare
    puts "Applying frosting"
  end
end

class Bananacake < Confection
  def prepare
    puts "Baking at 350 degrees for 25 minutes."
  end
end

cup = Cupcake.new
cup.prepare

banana = Bananacake.new
banana.prepare
