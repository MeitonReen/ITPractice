﻿using System;
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
		/*
		 * Дано целое число L (> 0) и строковая последовательность A. Вывести последнюю строку из A,
		 * начинающуюся с цифры и имеющую длину L. Если требуемых строк в последовательности A нет,
		 * то вывести строку «Not found».
		 * Указание. Для обработки ситуации, связанной с отсутствием требуемых строк, использовать
		 * операцию ??.
		 */
		public string GetLastLineStartingInDigitAndHasLengthL(int l, IEnumerable<string> a)
		{
			string Res = a.LastOrDefault(Line => Char.IsDigit(Line[0]) && Line.Length == l);
			return Res ?? "Not found";
		}
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
		}
	}
}
