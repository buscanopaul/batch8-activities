def unique_in_order(iterable)
  (iterable.is_a?(String) ? iterable.chars : iterable).chunk { |x| x }.map(&:first)
end

p unique_in_order("AAAABBBCCDAABBB")
p unique_in_order("ABBCcAD")
p unique_in_order([1, 2, 2, 3, 3])
