import fetcher from '../../utils/fetcher';
export const files = {
  state: {
    files: [],
    loading: false,
    error: null
  },
  reducers: {
    setFiles (state, payload) {
      return {
        loading: false,
        files: payload,
        error: null
      }
    },
    setLoading(state) {
      return {
        loading: true,
        files: [],
        error: null
      }
    },
    setError(state, payload) {
      return {
        loading: false,
        files: [],
        error: payload
      }
     }
  },
  effects: (dispatch) => ({
    async getFiles (payload, rootState) {
      dispatch.files.setLoading();
      try {
        const files = await fetcher.getFiles(payload)
        dispatch.files.setFiles(files)
      } catch (error) {
        dispatch.files.setError(error.response.data);
      }
    }
  })
}
