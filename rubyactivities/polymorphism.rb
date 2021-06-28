class Cook
  def prepare_recipe(recipe)
    recipe.prepare_recipe
  end
end

class Pizza
  def prepare_recipe
    puts "Pizza Recipe:"
    puts "-Spread the sauce"
    puts "-Sprinkle the cheese"
  end
end

class Macaroni
  def prepare_recipe
    puts "Macaroni Recipe:"
    puts "-Cook the noodles"
    puts "-Stir in the cheese"
  end
end

want_to_cook = Cook.new
pizza = Pizza.new

want_to_cook.prepare_recipe(pizza)

macaroni = Macaroni.new
want_to_cook.prepare_recipe(macaroni)
