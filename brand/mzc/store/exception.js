export const actions = {
  catchError({ dispatch }, err) {
    if (err.response && err.response.data && err.response.data.error) {
      if (err.response.status !== 403) {
        dispatch(
          'popup/openAlert',
          { message: err.response.data.error },
          { root: true }
        )
      }
    } else {
      dispatch(
        'popup/openAlert',
        { message: '서버연결이 원활하지 않습니다. 다시 시도하여 주십시오.' },
        { root: true }
      )
    }
  }
}
