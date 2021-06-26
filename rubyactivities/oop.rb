class Player
    def initialize(name)
        @name = name
    end

    def profile
        puts "#{@name} is the GOAT! joke lang"
    end
end

goat = Player.new("Lebron")
goat.profile