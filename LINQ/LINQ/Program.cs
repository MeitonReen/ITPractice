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
		/*
		 * Дано целое число K (> 0) и целочисленная последовательность A. Найти
		 * теоретико-множественную разность двух фрагментов A: первый содержит все четные числа,
		 * а второй — все числа с порядковыми номерами, большими K. В полученной последовательности
		 * (не содержащей одинаковых элементов) поменять порядок элементов на обратный.
		 */
		public IEnumerable<int> GetIntersectBetweenTwoPartsA(int k, IEnumerable<int> a)
		{
			return (a.TakeWhile(Num => Num % 2 == 0)).
				Intersect(a.TakeLast(k + 1)).
					Distinct().
						Reverse();
		}

		/*
		 * Дана строковая последовательность. Строки последовательности содержат только заглавные
		 * буквы латинского алфавита. Отсортировать последовательность по возрастанию длин строк,
		 * а строки одинаковой длины — в лексикографическом порядке по убыванию.
		 */
		public IEnumerable<string> SortByAscendingAndLexicographicDescending(IEnumerable<string> strings)
		{
			return strings.OrderBy(str => str.Length).ThenByDescending(str => str);
		}
		/*
		 * Дано целое число K (> 0) и последовательность непустых строк A. Строки последовательности содержат
		 * только цифры и заглавные буквы латинского алфавита. Найти теоретико-множественное пересечение двух
		 * фрагментов A: первый содержит K начальных элементов, а второй — все элементы, расположенные после
		 * последнего элемента, оканчивающегося цифрой. Полученную последовательность (не содержащую одинаковых
		 * элементов) отсортировать по возрастанию длин строк, а строки одинаковой длины — в лексикографическом
		 * порядке по возрастанию.
		 */
		public IEnumerable<string> GetIntersectOfTwoPartsA(int k, IEnumerable<string> a)
		{
			return a.Take(k)
				.Intersect(a.Reverse().TakeWhile(str => !char.IsDigit(str[str.Length - 1])))
					.OrderBy(str => str.Length)
						.ThenBy(str => str);
		}
		/*
		 * Дана последовательность непустых строк A. Получить последовательность символов, каждый элемент
		 * которой является начальным символом соответствующей строки из A. Порядок символов должен быть обратным
		 * по отношению к порядку элементов исходной последовательности.
		 */
		public IEnumerable<char> GetCharSequence(IEnumerable<string> a)
		{
			return a.Reverse().Select(str => str[0]);
		}
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
		}
	}
}
