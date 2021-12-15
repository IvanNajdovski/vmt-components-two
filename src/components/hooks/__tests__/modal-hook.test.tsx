import { renderHook, act } from '@testing-library/react-hooks'
import { useModal } from '../modal-hook';

test('update the modal open value', () => {
  const { result, rerender } = renderHook(() => useModal(true));

  const modalData={}
  const modalOptions={}
  const modalContent={}
  const modalSubmitAction={}

    act(() => {
      result.current.onModalOpen({modalData, modalOptions, modalContent, modalSubmitAction})

      expect(result.current.modalData).toBe(null)
      expect(result.current.modalOpen).toBe(true)
      expect(result.current.modalOptions).toBe(null)
    });

    act(() => {
      result.current.onModalClose()

      expect(result.current.modalOpen).toBe(true)
    });

    act(() => {
      result.current.onSubmit()

      expect(result.current.modalOpen).toBe(false)
      expect(result.current.modalOptions).toBe(null)
    });

    act(() => {
      result.current.onModalSubmit()

      expect(result.current.modalOpen).toBe(false)
      expect(result.current.modalOptions).toBe(null)
    });
});