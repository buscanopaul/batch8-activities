arr = [34, 15, 88, 2]
smallest = arr[0]

arr.each do |item|
    if item < smallest
        smallest = item
    end
end

puts smallest