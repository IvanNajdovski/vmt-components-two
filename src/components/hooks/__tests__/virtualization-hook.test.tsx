import { renderHook, act } from '@testing-library/react-hooks'
import { useVirtualization } from '../virtualization-hook';

test('useVirtualization', () => {

  const { result, rerender } = renderHook(() => useVirtualization({ simple: "data" }, 10));
  const params = null
  const data =  null

    act(() => {
      result.current.pageChange(20)
      result.current.getSlicedGridData([1, 2, 3, 4, 5, 6, 7, 8, 9.10], 50, 5, 2)
    });

  act(() => {
    result.current.pageChange(20)
    result.current.getSlicedGridData([], 50, 5, 2)
  });

  //Sliced index > 15
  act(() => {
    result.current.pageChange(20)
    result.current.getSlicedGridData([], 50, 5, 2)
  });

  act(() => {
    expect(result.current.data).toStrictEqual([])
    result.current.pageChange(20)
    result.current.getSlicedGridData([1, 2, 3, 4, 5, 6, 7, 8, 9.10], 25, 10, 20)
  });
});