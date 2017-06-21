#pragma once
using namespace System;
using namespace System::Collections::Generic;

namespace V5
{
	namespace Collections
	{
		generic <typename T>
		public value struct Span //: IEnumerable<T>
		{
		private:
			array<T>^ _array;
			int _index;
			int _length;

		public:
			Span(array<T>^ array);
			Span(array<T>^ array, int index, int length);

			property Int32 Length { Int32 get(); }
			property T default[Int32] { T get(Int32 index); void set(Int32 index, T value); }
			
			//virtual IEnumerator<T>^ GetEnumerator();
		};

		/*generic <typename T>
		public ref struct SpanEnumerator : IEnumerator<T>
		{
		private:
			Span<T>^ _span;
			int _index;

		public:
			virtual property T Current { T get(); }

			virtual bool MoveNext();
			virtual void Reset();
		};*/
	}
}

