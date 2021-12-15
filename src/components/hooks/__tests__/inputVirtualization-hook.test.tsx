import { renderHook, act } from '@testing-library/react-hooks'
import { useInputVirtualization } from '../inputVirtualization-hook';
import { useState, useEffect } from "react";

test('useInputVirtualization', () => {

    const { result, rerender } = renderHook(() => useInputVirtualization({ simple: "data" }, 10, "textField", 1));

    const event = {
        filter: {
            value: 2
        },
        page: {
            skip: 1
        }
    }
    act(() => {
        result.current.pageChange(event)
        result.current.getSlicedGridData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 50, 5, 2)
        result.current.getSlicedGridData([1, 2, 3, 4], 5, 5, 2)
        result.current.getSlicedGridData([1, 2, 3, 4], 20, 5, 2)
        result.current.getSlicedGridData([], 50, 5, 2)
        result.current.onFilterChange(event)

        expect(result.current.data).toStrictEqual([])
        expect(result.current.tableSkip).toBe(0)
        expect(result.current.total).toBe(0)
        expect(result.current.page).toBe(0)
    });
});