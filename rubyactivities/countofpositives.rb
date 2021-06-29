arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]

positiveGroup = 0
negativeGroup = []
mergeArray = []

arr.each do |num|
  if num > 0
    positiveGroup += 1
  else
    negativeGroup.push(num)
  end
end

mergeArray.push(positiveGroup)
mergeArray.push(negativeGroup.to_a.sum)

puts mergeArray.inspect
