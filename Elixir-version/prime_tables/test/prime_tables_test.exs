defmodule PrimeTablesTest do
	use ExUnit.Case
	#doctest PrimeTables

	# ==============================
	#	Validating user input
	# ==============================

	# n is not null
	test "n is not null" do
		refute( is_nil( PrimeTables.input_n() ) )
	end

	# n is a number
	test "n is an integer" do
		assert( is_integer( PrimeTables.input_n() ) )
	end

	# n is greater than 0
	test "n > 0" do
		assert PrimeTables.input_n() > 0
	end

	# ==============================
	#	Finding the n first prime numbers
	# ==============================

	# list contains n numbers

	# checking that the list contains no duplicate

	# checking that all numbers are indeed primes (brute-force)

	# comparing the first 1000 primes found to a checked list (brute-force)
	# if we computed correctly the first 1000 of prime numbers, it can be supposed that our method of computation is working

	# ==============================
	#	Checking the storage
	# ==============================

	# array contains n x n numbers

	# file is not empty

	# file start with a placeholder for the top-left corner
end
