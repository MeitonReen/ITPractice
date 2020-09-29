using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQ
{
	class Program
	{
		/*
		 * Дана целочисленная последовательность, содержащая как положительные,
		 * так и отрицательные числа. Вывести ее первый положительный элемент и
		 * последний отрицательный элемент.
		 */
		struct TwoValue
		{
			public int? FirstPositive;
			public int? LastNegative;
		}
		static TwoValue GetFirstPositiveAndLastNegativeElement(IEnumerable<int> enumerableInt)
		{
			TwoValue Res;
			Res.FirstPositive = enumerableInt.FirstOrDefault(El => El > 0);
			Res.LastNegative = enumerableInt.LastOrDefault(El => El < 0);
			return Res;
		}
		
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
		}
	}
}
