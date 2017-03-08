defmodule PrimeTables do
	@moduledoc """
	Documentation for PrimeTables.
	"""

	@doc """
	Hello world.

	## Examples

			iex> PrimeTables.hello
			:world

	"""


	def input_n do
		n_string = String.strip( IO.gets( "Please enter an integer greater than 1: " ) )
		if ( !is_nil( n_string ) and Regex.match?( ~r/^[0-9]*$/, n_string ) and Integer.parse( n_string ) > 0 ) do
			# returning n as a number
			n = String.to_integer( n_string )
		else
			# requesting new correct input
			IO.puts( "This is not a valid input!")
			input_n()
		end
	end

end
