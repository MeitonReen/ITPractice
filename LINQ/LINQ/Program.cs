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
		/*
		 * Дана цифра D (однозначное целое число) и целочисленная последовательность A.
		 * Вывести первый положительный элемент последовательности A, оканчивающийся цифрой D.
		 * Если требуемых элементов в последовательности A нет, то вывести 0.
		 */
		public int GetFirstPositiveElementEndindInD(int d, IEnumerable<int> a)
		{
			return a.FirstOrDefault(El => El % 10 == d);
		}
		
	}
}
