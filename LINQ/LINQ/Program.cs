﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;

namespace LINQ
{
	class Program
	{
		/*
		 * Дана целочисленная последовательность, содержащая как положительные,
		 * так и отрицательные числа. Вывести ее первый положительный элемент и
		 * последний отрицательный элемент.
		 */
		public struct TwoValue
		{
			public int? FirstPositive;
			public int? LastNegative;
		}
		public static TwoValue GetFirstPositiveAndLastNegativeElement(IEnumerable<int> enumerableInt)
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
		public static int GetFirstPositiveElementEndindInD(int d, IEnumerable<int> a)
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
		public static string GetLastLineStartingInDigitAndHasLengthL(int l, IEnumerable<string> a)
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
		public static IEnumerable<int> GetIntersectBetweenTwoPartsA(int k, IEnumerable<int> a)
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
		public static IEnumerable<string> SortByAscendingAndLexicographicDescending(IEnumerable<string> strings)
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
		public static IEnumerable<string> GetIntersectOfTwoPartsA(int k, IEnumerable<string> a)
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
		public static IEnumerable<char> GetCharSequence(IEnumerable<string> a)
		{
			return a.Reverse().Select(str => str[0]);
		}
		/*
		 * Дана целочисленная последовательность. Получить последовательность чисел, каждый элемент которой
		 * равен произведению соответствующего элемента исходной последовательности на его порядковый номер
		 * (1, 2, …). В полученной последовательности удалить все элементы, не являющиеся двузначными, и поменять
		 * порядок оставшихся элементов на обратный.
		 */
		public static IEnumerable<int> GetIntSequence(IEnumerable<int> intSeq)
		{
			return
				intSeq.Select((Int, Index) => Int * (Index++))
					.Where(Int => Math.Abs(Int % 100) < 1)
						.Reverse();
		}
		/*
		 * Дана строковая последовательность A. Строки последовательности содержат только заглавные буквы
		 * латинского алфавита. Получить новую последовательность строк, элементы которой определяются по
		 * соответствующим элементам A следующим образом: пустые строки в новую последовательность не включаются,
		 * а к непустым приписывается порядковый номер данной строки в исходной последовательности (например,
		 * если пятый элемент A имеет вид «ABC», то в полученной последовательности он будет иметь вид «ABC5»).
		 * При нумерации должны учитываться и пустые строки последовательности A. Отсортировать полученную
		 * последовательность в лексикографическом порядке по возрастанию.
		 */
		public static IEnumerable<string> GetStringSequence(IEnumerable<string> a)
		{
			return
				a.Select((Str, Index) => Str.Any() ? Str.Concat(Index.ToString()).ToString() : string.Empty)
					.Where(Str => string.IsNullOrEmpty(Str))
						.OrderBy(Str => Str);
		}
		/*
		 * Даны последовательности положительных целых чисел A и B; все числа в каждой последовательности различны.
		 * Найти последовательность всех пар чисел, удовлетворяющих следующим условиям: первый элемент пары
		 * принадлежит последовательности A, второй принадлежит B, и оба элемента оканчиваются одной и той же
		 * цифрой. Результирующая последовательность называется внутренним объединением последовательностей
		 * A и B по ключу, определяемому последними цифрами исходных чисел. Представить найденное объединение
		 * в виде последовательности строк, содержащих первый и второй элементы пары, разделенные дефисом, например,
		 * «49-129». Порядок следования пар должен определяться исходным порядком элементов последовательности A,
		 * а для равных первых элементов — порядком элементов последовательности B.
		 */
		public static IEnumerable<string> GetStringSequenceFromJoinedIntSequences(
			IEnumerable<int> a, IEnumerable<int> b)
		{
			return
				a.Join(b, Ela => Ela % 10, Elb => Elb % 10, (Ela, Elb) => Ela.ToString() + '-' + Elb.ToString());
		}
		/*
		 * Дана последовательность непустых строк. Среди всех строк, начинающихся с одного и того же символа,
		 * выбрать наиболее длинную. Если таких строк несколько, то выбрать первую по порядку их следования
		 * в исходной последовательности. Полученную последовательность строк упорядочить по возрастанию кодов
		 * их начальных символов.
		 */
		public static IEnumerable<string> FilterStringSequence(IEnumerable<string> strSeq)
		{
			return strSeq.GroupBy(Str => Str[0], (Key, StrSeqByKey) =>
				StrSeqByKey.OrderByDescending(Str => Str.Length).First())
					.OrderBy(Str => char.GetNumericValue(Str[0]));
		}
		/*
		 * Дана последовательность непустых строк A, содержащих только заглавные буквы латинского алфавита.
		 * Для всех строк, начинающихся с одной и той же буквы, определить их суммарную длину и получить
		 * последовательность строк вида «S-C», где S — суммарная длина всех строк из A, которые начинаются
		 * с буквы С. Полученную последовательность упорядочить по убыванию числовых значений сумм, а при
		 * равных значениях сумм — по возрастанию кодов символов C.
		 */
		public static IEnumerable<string> GetStringSequence2(IEnumerable<string> a)
		{
			return
				a.GroupBy(Str => Str[0], (Key, StrSeqByKey) =>
					StrSeqByKey.Sum(Str => Str.Length).ToString() + '-' + Key.ToString())
						.OrderByDescending(Str => int.Parse(Str.TakeWhile(Char => Char == '-').ToString()))
							.ThenBy(Str => int.Parse(Str.Reverse().TakeWhile(Char => Char == '-').ToString()));
		}
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
		}
	}
}
