def isSquare(num)
    if num < 0 
        return false
    else    
        square = num.to_i ** 0.5 % 1
        if square*square == num
            return true
        else
            return false
        end
    end
end

print isSquare(0)

    


